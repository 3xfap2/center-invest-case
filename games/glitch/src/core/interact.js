// Взаимодействие: луч из центра экрана, подсказка «[E] Взять фонарь».
// Локация отдаёт слоты {id, object}. Сценарий главы регистрирует поведение: handlers[id] = {label, onUse, enabled}.
import * as THREE from 'three';
import { bus } from './events.js';
import { input, isTouch } from './input.js';

const MAX_DIST = 2.6;
const ray = new THREE.Raycaster();
const center = new THREE.Vector2(0, 0);

export class Interactor {
  constructor(camera) {
    this.camera = camera;
    this.slots = []; // {id, object}
    this.handlers = {}; // id -> {label: string | () => string, onUse(), enabled?: () => bool}
    this.meshes = [];
    this.current = null;
    this.lastLabel = null;
    bus.on('input:interact', () => this.use());
  }

  setSlots(slots) {
    this.slots = slots;
    this.meshes = [];
    for (const s of slots) {
      s.object.traverse((o) => {
        if (o.isMesh) {
          o.userData.interactId = s.id;
          this.meshes.push(o);
        }
      });
    }
    this.current = null;
  }

  setHandlers(handlers) {
    this.handlers = handlers;
  }

  update() {
    let found = null;
    if (input.enabled) {
      ray.setFromCamera(center, this.camera);
      ray.far = MAX_DIST;
      const hits = ray.intersectObjects(this.meshes, false);
      for (const h of hits) {
        if (!h.object.visible || !isVisibleChain(h.object)) continue;
        const id = h.object.userData.interactId;
        const hd = this.handlers[id];
        if (hd && (!hd.enabled || hd.enabled())) found = id;
        break; // ближайший объект перекрывает остальные
      }
    }
    this.current = found;
    const hd = found ? this.handlers[found] : null;
    const label = hd ? (typeof hd.label === 'function' ? hd.label() : hd.label) : null;
    if (label !== this.lastLabel) {
      this.lastLabel = label;
      bus.emit('prompt', label);
    }
  }

  use() {
    if (!this.current || !input.enabled) return;
    const hd = this.handlers[this.current];
    if (hd) hd.onUse();
  }
}

function isVisibleChain(o) {
  for (let p = o; p; p = p.parent) if (!p.visible) return false;
  return true;
}

export const promptKey = isTouch ? '' : '[E] ';
