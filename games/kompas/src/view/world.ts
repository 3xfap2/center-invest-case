import * as T from 'three';
import { axisById, camp, roomById } from '../camp/content';
import type { Emote } from '../camp/content';
import { activity, difficultyRules, occupants, symbols } from '../camp/game';
import type { CampState } from '../camp/game';
import { batchStatic, box, figure, terrain, toolsFor, workshop } from './models';

interface Snapshot { state: CampState; paused: boolean; focus: string | null; hover: string | null; dragging: boolean }
const startAngle = 0.32;
const tint: Record<Emote, string> = {
  interest: '#f9d784', help: '#f5aeaa', stress: '#a6deea', bored: '#d8d0ed', conflict: '#ff9c74',
};

function badge(emote: Emote) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.beginPath();
  ctx.arc(64, 61, 49, 0, Math.PI * 2);
  ctx.fillStyle = '#172d24';
  ctx.fill();
  ctx.strokeStyle = tint[emote];
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = tint[emote];
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 63px "Segoe UI Symbol", sans-serif';
  ctx.fillText(symbols[emote], 64, 63);
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  return new T.SpriteMaterial({ map: texture, depthTest: false, transparent: true, toneMapped: false });
}

function compass(scene: T.Group) {
  const ring = new T.Mesh(new T.RingGeometry(1.0, 1.04, 32), new T.MeshBasicMaterial({ color: '#d4be89', side: T.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(4.55, 0.072, 6.25);
  scene.add(ring);
  for (let i = 0; i < 4; i++) {
    const needle = box(scene, 0.08, 0.025, 1.29, ring.position.x, 0.07, ring.position.z, i % 2 ? '#c1ad78' : '#e4cf94', false);
    needle.rotation.y = i * Math.PI / 4;
  }
}

export class World {
  private scene = new T.Scene();
  private camera = new T.OrthographicCamera(-20, 20, 12, -12, 0.1, 150);
  private renderer: T.WebGLRenderer;
  private map = new T.Group();
  private sun = new T.DirectionalLight('#fff0ca', 2.2);
  private ambient = new T.HemisphereLight('#fff0d0', '#827d5a', 1.85);
  private readonly land;
  private rooms = new Map(camp.workshops.map(room => [room.id, workshop(this.map, room)]));
  private teens = camp.teens.map((teen, index) => {
    const fig = figure(this.map, teen);
    fig.root.traverse(object => { if (object instanceof T.Mesh) object.castShadow = false; });
    fig.root.position.set(-3.25 + index * 1.42, 0.016, 3.65 + (index % 2) * 0.45);
    const sprite = new T.Sprite();
    sprite.renderOrder = 4;
    sprite.visible = false;
    sprite.scale.setScalar(1.15);
    this.map.add(sprite);
    return { ...fig, tools: toolsFor(fig.arms[0]), sprite, teen, index };
  });
  private emotes = Object.fromEntries(Object.keys(tint).map(emote => [emote, badge(emote as Emote)])) as Record<Emote, T.SpriteMaterial>;
  private ray = new T.Raycaster();
  private point = new T.Vector2();
  private aim = new T.Vector3();
  private anchor = new T.Vector3();
  private goal = new T.Vector3();
  private sceneFocus: string | null = null;
  private theta = startAngle;
  private zoom = 1;
  private smoothedZoom = 1;
  private ratio = 1;
  private sunPhase = 0;
  private shadowStep = -1;
  private previousWatch = false;
  private displayScale = Math.min(devicePixelRatio, 1.4);
  private slowFrames = 0;
  private fastFrames = 0;
  private motion = 0;
  private last = 0;
  private frame = 0;
  private resizeObserver: ResizeObserver;
  private snapshot: Snapshot;
  private width = 1;
  private height = 1;

  constructor(private element: HTMLElement, snapshot: Snapshot, private firstFrame: () => void) {
    this.snapshot = snapshot;
    this.renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    const gl = this.renderer.getContext();
    const diagnostic = gl.getExtension('WEBGL_debug_renderer_info');
    const adapter = diagnostic ? String(gl.getParameter(diagnostic.UNMASKED_RENDERER_WEBGL)) : '';
    const software = /swiftshader|llvmpipe|software/i.test(adapter);
    this.displayScale = software ? Math.min(this.displayScale, 0.86) : this.displayScale;
    this.renderer.setPixelRatio(this.displayScale);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.type = software ? T.BasicShadowMap : T.PCFShadowMap;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    this.renderer.domElement.setAttribute('aria-label', 'Трёхмерная карта лагеря');
    this.renderer.domElement.className = 'terrain';
    element.prepend(this.renderer.domElement);
    const baseModel = new T.Group();
    this.map.add(baseModel);
    this.land = terrain(baseModel);
    compass(baseModel);
    batchStatic(baseModel);
    for (const room of this.rooms.values()) {
      batchStatic(room.group, room.roof);
      batchStatic(room.roof);
    }
    this.scene.add(this.map, this.sun, this.ambient);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    Object.assign(this.sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 0.1, far: 110 });
    this.sun.shadow.normalBias = 0.033;
    this.sun.shadow.bias = -0.00015;
    this.sun.target.position.set(0, 0, 0);
    this.scene.add(this.sun.target);
    const base = new T.Mesh(new T.PlaneGeometry(140, 140), new T.ShadowMaterial({ opacity: 0.16 }));
    base.rotation.x = -Math.PI / 2;
    base.position.y = -1.54;
    base.receiveShadow = true;
    this.scene.add(base);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(element);
    this.resize();
    this.frame = requestAnimationFrame(this.render);
  }

  set(snapshot: Snapshot) {
    this.snapshot = snapshot;
  }

  rotate(dx: number) { this.theta -= dx * 0.009; }

  scroll(dy: number) { this.zoom = T.MathUtils.clamp(this.zoom * Math.exp(-dy * 0.0013), 0.63, 2.38); }

  reset() { this.theta = startAngle; this.zoom = 1; }

  pick(x: number, y: number, kind: 'room' | 'teen'): string | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
    this.point.set((x - rect.left) / rect.width * 2 - 1, -(y - rect.top) / rect.height * 2 + 1);
    this.ray.setFromCamera(this.point, this.camera);
    const targets = kind === 'room' ? [...this.rooms.values()].map(room => room.group) : this.teens.map(teen => teen.root);
    const hit = this.ray.intersectObjects(targets, true)[0];
    let object: T.Object3D | null = hit?.object ?? null;
    while (object) {
      if (object.userData[kind]) return object.userData[kind] as string;
      object = object.parent;
    }
    return null;
  }

  private resize() {
    this.width = Math.max(1, this.element.clientWidth);
    this.height = Math.max(1, this.element.clientHeight);
    this.ratio = this.width / this.height;
    this.renderer.setSize(this.width, this.height, false);
  }

  private project(el: HTMLElement, x: number, y: number, z: number) {
    const point = this.anchor.set(x, y, z).project(this.camera);
    const left = (point.x * 0.5 + 0.5) * this.width;
    const top = (-point.y * 0.5 + 0.5) * this.height;
    el.style.transform = 'translate(' + left.toFixed(1) + 'px,' + top.toFixed(1) + 'px) translate(-50%,-50%)';
    el.style.visibility = left < 30 || left > this.width - 30 || top < 22 || top > this.height - 24 ? 'hidden' : '';
  }

  private render = (now: number) => {
    const frameMs = now - (this.last || now);
    const dt = Math.min(frameMs / 1000, 0.15);
    this.last = now;
    this.frame = requestAnimationFrame(this.render);
    const { state, paused, focus, hover, dragging } = this.snapshot;
    if (!paused) {
      this.motion += dt;
      this.adaptResolution(frameMs);
    }
    if (focus !== this.sceneFocus) {
      this.sceneFocus = focus;
      this.zoom = focus ? 1.8 : 1;
    }
    const room = focus ? roomById.get(focus) : undefined;
    this.goal.set(room?.position[0] ?? 0, room ? 1.14 : 0.3, room?.position[1] ?? -0.15);
    if (!dragging) {
      this.aim.lerp(this.goal, 1 - Math.exp(-dt * 6));
      this.smoothedZoom = T.MathUtils.damp(this.smoothedZoom, this.zoom, 7, dt);
    }
    const span = Math.max(20.4, 25.3 / this.ratio) / this.smoothedZoom;
    const width = span * this.ratio;
    Object.assign(this.camera, { left: -width, right: width, top: span, bottom: -span });
    this.camera.position.set(this.aim.x + Math.sin(this.theta) * 39, this.aim.y + 34, this.aim.z + Math.cos(this.theta) * 39);
    this.camera.lookAt(this.aim);
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
    const watch = state.phase === 'watch' || state.phase === 'review';
    const night = ['talk', 'paths', 'rank', 'epilogue', 'quiz', 'result'].includes(state.phase);
    const warmth = night ? 1 : state.slot * 0.15 + state.day * 0.06 + (watch ? state.elapsed / 500 : 0);
    if (!paused) this.sunPhase = T.MathUtils.damp(this.sunPhase, warmth, 2.1, dt);
    const light = this.sunPhase;
    this.sun.position.set(-16 - light * 15, 32 - light * 21, 18);
    this.sun.intensity = 2.05 - light * 1.62;
    this.ambient.intensity = 1.34 - light * 0.57;
    this.sun.color.setRGB(1, 0.87 - light * 0.25, 0.65 - light * 0.12);
    this.ambient.color.setRGB(0.97 - light * 0.52, 0.95 - light * 0.34, 0.79 - light * 0.03);
    const lampLevel = Math.max(0, light - 0.48) * 2;
    for (const lamp of this.land.lamps) {
      lamp.glass.emissiveIntensity = 0.13 + lampLevel * 2;
      // Only the central pair casts light. The rest use emissive glass.
      lamp.glow.intensity = lamp === this.land.lamps[0] || lamp === this.land.lamps[1] ? lampLevel * 12 : 0;
    }
    this.land.glints.position.x = Math.sin(this.motion * 0.63) * 0.15;
    const step = Math.round(light * 32);
    if (this.shadowStep !== step || this.previousWatch !== watch) {
      this.shadowStep = step;
      this.previousWatch = watch;
      this.renderer.shadowMap.needsUpdate = true;
    }
    for (const model of this.rooms.values()) {
      const cast = model.fade > 0.7;
      model.fade = T.MathUtils.damp(model.fade, watch ? 0 : 1, 5.5, dt);
      model.roof.visible = model.fade > 0.025;
      [model.cover, model.frame, model.upper].forEach(material => {
        material.opacity = model.fade;
        material.depthWrite = model.fade > 0.94;
      });
      if (cast !== (model.fade > 0.7)) {
        model.roof.traverse(obj => { if (obj instanceof T.Mesh) obj.castShadow = !cast; });
        this.renderer.shadowMap.needsUpdate = true;
      }
      const id = model.group.userData.room as string;
      const data = roomById.get(id)!;
      const busy = watch && camp.teens.some(teen => state.assignments[teen.id] === id);
      if (model.robotHead) model.robotHead.rotation.y = busy ? Math.sin(this.motion * 2.5) * 0.42 : 0;
      for (const [i, learner] of model.learners.entries()) {
        learner.root.visible = busy;
        learner.arms[i].rotation.x = -0.96 + Math.sin(this.motion * 3.8 + i) * 0.52;
      }
      const selected = hover === id;
      model.cover.color.set(selected ? axisById[data.type].color : roofColor(data.type));
      const label = this.element.querySelector<HTMLElement>('[data-room-label="' + id + '"]');
      if (label) this.project(label, model.group.position.x, watch ? 0.6 : 1.15, model.group.position.z + 2.82);
    }
    const swing = this.motion * 6;
    for (const item of this.teens) {
      const location = roomById.get(state.assignments[item.teen.id]);
      const order = location ? occupants(state, location.id).findIndex(teen => teen.id === item.teen.id) : 0;
      const somewhere = location && (watch || state.phase === 'plan');
      const dx = somewhere ? location.position[0] + [-1.67, 1.63, 0][order] : -3.25 + item.index * 1.42;
      const dz = somewhere ? location.position[1] + (watch ? order === 2 ? 1.5 : 0.52 : 3.52) : 3.72 + (item.index % 2) * 0.56;
      const dy = watch && location ? 0.398 : 0.03;
      const root = item.root;
      this.goal.set(dx, dy, dz);
      const moving = root.position.distanceTo(this.goal) > 0.42;
      if (!paused) {
        if (moving) root.rotation.y = Math.atan2(dx - root.position.x, dz - root.position.z);
        else root.rotation.y = T.MathUtils.damp(root.rotation.y, watch && location && location.type !== 'people' ? (order % 2 ? -2.65 : 2.65) : 0.16, 4, dt);
        root.position.lerp(this.goal, 1 - Math.exp(-dt * 2.2));
      }
      const signal = activity(state, item.teen);
      const acting = watch && location && !moving;
      const wave = Math.sin(swing + item.index * 2.15);
      const workAngle = !acting ? 0 : location.type === 'nature' ? -0.83 : location.type === 'art' ? -1.35 : -0.99;
      for (const [type, tool] of item.tools) tool.visible = !!acting && location.type === type;
      const gesture = signal?.emote === 'bored' || signal?.emote === 'stress' ? 0.43 : 1;
      item.arms[0].rotation.x = moving ? wave * 0.56 : workAngle * gesture + wave * (acting ? 0.33 : 0.07);
      item.arms[1].rotation.x = moving ? -wave * 0.56 : workAngle * 0.71 * gesture - wave * (acting ? 0.27 : 0.07);
      item.legs[0].rotation.x = moving ? -wave * 0.5 : 0;
      item.legs[1].rotation.x = moving ? wave * 0.5 : 0;
      item.chest.rotation.x = acting ? 0.10 + wave * 0.035 : 0;
      item.chest.position.y = moving ? Math.abs(wave) * 0.09 : 0;
      const pop = Math.sin(this.motion * 3 + item.index) * 0.1;
      item.sprite.visible = !!signal?.active;
      if (signal) {
        item.sprite.material = this.emotes[signal.emote];
        item.sprite.scale.setScalar((difficultyRules[state.difficulty].hint ? 1.03 : 0.77) + pop);
        item.sprite.position.set(root.position.x, root.position.y + 2.48 + pop, root.position.z);
      }
      const label = this.element.querySelector<HTMLElement>('[data-teen-label="' + item.teen.id + '"]');
      if (label) this.project(label, root.position.x, root.position.y + (signal?.active ? 0.48 : 1.88), root.position.z + 0.28);
    }
    this.renderer.render(this.scene, this.camera);
    if (this.firstFrame) {
      const ready = this.firstFrame;
      this.firstFrame = () => {};
      ready();
    }
  };

  private adaptResolution(frameMs: number) {
    if (frameMs <= 0 || frameMs > 1000) return;
    this.slowFrames = frameMs > 25 ? this.slowFrames + 1 : Math.max(0, this.slowFrames - 2);
    this.fastFrames = frameMs < 18.5 ? this.fastFrames + 1 : 0;
    const ceiling = Math.min(devicePixelRatio, 1.4);
    const next = this.slowFrames >= 22 ? Math.max(0.58, this.displayScale * 0.86) :
      this.fastFrames >= 300 ? Math.min(ceiling, this.displayScale + 0.1) : this.displayScale;
    if (next === this.displayScale) return;
    this.displayScale = next;
    this.slowFrames = this.fastFrames = 0;
    this.renderer.setPixelRatio(next);
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

function roofColor(type: string) {
  return ({ nature: '#a7bf99', tech: '#b76240', people: '#d68c62', signs: '#52877f', art: '#947798' } as Record<string, string>)[type];
}
