import * as T from 'three'
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js'
import mariaUrl from './models/maria.glb?inline'
import irinaUrl from './models/irina.glb?inline'
import motherUrl from './models/mother.glb?inline'
import danyaUrl from './models/danya.glb?inline'
import stasUrl from './models/stas.glb?inline'
import type { Place } from './floor'

const files = { maria: mariaUrl, stas: stasUrl, irina: irinaUrl, danya: danyaUrl, mother: motherUrl }
type Person = keyof typeof files
type Motion = 'idle' | 'walk' | 'speak' | 'busy' | 'sit'
const up = new T.Vector3(0, 1, 0)
const side = new T.Vector3(1, 0, 0)
const twist = new T.Quaternion()
const inverse = new T.Quaternion()
const motionClips: Record<Motion, string> = {
  idle: 'Idle', walk: 'Walk', speak: 'Idle_Neutral', busy: 'Interact', sit: 'Idle',
}

const routes: Record<'maria' | 'stas', T.Vector3[]> = {
  maria: [[-4.02,-3.1],[-4.12,.25],[-6.40,.26],[-6.41,-4.91],[-8.59,-4.83]].map(([x,z]) => new T.Vector3(x,0,z)),
  stas: [[-4.72,1.22],[-3.47,1.18],[-1.16,1.14],[2.20,1.05],[2.20,-2.3],[2.18,1.08],[-1.23,1.17],[-3.5,1.22]].map(([x,z]) => new T.Vector3(x,0,z)),
}

const palette: Record<Person, string[]> = {
  maria: ['#293248', '#725877', '#d6a77b'],
  stas: ['#304a5e', '#446d76', '#b98360'],
  irina: ['#424763', '#477a79', '#94758a'],
  mother: ['#464158', '#836279', '#a28e7c'],
  danya: ['#314057', '#856550', '#bda27a'],
}
const sizes: Record<Person, number> = { maria: 1.71, stas: 1.78, irina: 1.67, mother: 1.7, danya: 1.56 }

class Actor {
  readonly node = new T.Group()
  private mixer: T.AnimationMixer
  private clips: Map<string, T.AnimationAction>
  private bones = new Map<string, T.Bone>()
  private offsets = new Map<T.Bone, T.Quaternion>()
  private animation?: T.AnimationAction
  private lookYaw = 0
  private state?: Motion
  routeIndex = 1
  wait = 0

  constructor(readonly id: Person, model: GLTF) {
    this.node.name = 'character:' + id
    this.node.add(model.scene)
    this.node.updateMatrixWorld(true)
    const bounds = new T.Box3().setFromObject(model.scene)
    const dimension = Math.max(.01, bounds.max.y - bounds.min.y)
    const size = sizes[id] / dimension
    model.scene.scale.multiplyScalar(size)
    model.scene.position.y -= bounds.min.y * size
    let color = 0
    const reworked = new Set<T.Material>()
    model.scene.traverse(object => {
      if (object instanceof T.Bone) this.bones.set(object.name.replaceAll('.', ''), object)
      if (!(object instanceof T.Mesh)) return
      object.castShadow = false
      for (const material of [object.material].flat()) {
        if (reworked.has(material)) continue
        reworked.add(material)
        if (!(material instanceof T.MeshStandardMaterial)) continue
        if (!/skin|brown|hair/i.test(material.name)) material.color.set(palette[id][color++ % 3])
        material.metalness = 0
        material.roughness = .8
      }
    })
    this.mixer = new T.AnimationMixer(model.scene)
    this.clips = new Map(model.animations.map(clip => [clip.name, this.mixer.clipAction(clip)]))
    if (id === 'stas') {
      const mug = new T.Mesh(new T.CylinderGeometry(.063 / size, .051 / size, .105 / size, 10),
        new T.MeshStandardMaterial({ color: '#bc8963', roughness: .73 }))
      mug.rotation.z = .38
      mug.position.set(.065 / size, .07 / size, .017 / size)
      this.bones.get('WristR')?.add(mug)
    }
  }

  private addPose(name: string, axis: T.Vector3, angle: number) {
    const bone = this.bones.get(name)
    if (!bone || Math.abs(angle) < .002) return
    twist.setFromAxisAngle(axis, angle)
    bone.quaternion.multiply(twist)
    const prior = this.offsets.get(bone)
    if (prior) prior.multiply(twist)
    else this.offsets.set(bone, twist.clone())
  }

  animate(delta: number, time: number, motion: Motion, gaze: number) {
    if (this.state !== motion) {
      this.state = motion
      const playback = this.clips.get(motionClips[motion]) ?? this.clips.get('Idle')
      if (playback !== this.animation) {
        this.animation?.fadeOut(.19)
        playback?.reset().fadeIn(.19).play()
        this.animation = playback
      }
    }
    for (const [bone, applied] of this.offsets) bone.quaternion.multiply(inverse.copy(applied).invert())
    this.offsets.clear()
    this.mixer.update(delta)
    this.lookYaw = T.MathUtils.lerp(this.lookYaw, gaze, Math.min(1, delta * 7))
    this.addPose('Head', up, this.lookYaw)
    if (motion === 'speak') {
      this.addPose('Head', side, .055 * Math.sin(time * 5.2) + .035 * Math.sin(time * 8.7))
      this.addPose('UpperArmR', side, -.19 + .13 * Math.sin(time * 4.1))
      this.addPose('LowerArmR', side, -.32 + .19 * Math.sin(time * 5.3 + .7))
      this.addPose('LowerArmL', side, -.18 + .14 * Math.sin(time * 3.2 + .4))
    }
    if (motion === 'sit') {
      for (const leg of ['L', 'R']) {
        this.addPose('UpperLeg' + leg, side, -1.43)
        this.addPose('LowerLeg' + leg, side, 1.42)
        this.addPose('LowerArm' + leg, side, -.35 + Math.sin(time * 8.1 + Number(leg === 'L')) * .058)
      }
    }
    this.node.position.y = T.MathUtils.lerp(this.node.position.y, motion === 'sit' ? -.39 : 0, Math.min(delta * 6, 1))
  }
}

export async function createPeople(scene: T.Scene) {
  const loader = new GLTFLoader()
  const actors = await Promise.all((Object.entries(files) as [Person, string][]).map(async ([key, source]) =>
    new Actor(key, await loader.loadAsync(source))))
  const people = new Map(actors.map(actor => [actor.id, actor]))
  const person = (id: Person) => people.get(id)!
  person('maria').node.position.copy(routes.maria[0])
  person('stas').node.position.copy(routes.stas[0])
  person('irina').node.position.set(-7.46, 0, 5.12)
  person('mother').node.position.set(-6.08, 0, 6.30)
  person('danya').node.position.set(-5.21, 0, 5.94)
  for (const actor of actors) {
    actor.node.visible = false
    scene.add(actor.node)
  }
  let time = 0
  const difference = new T.Vector3()
  const turn = (actor: Actor, angle: number, delta: number) => {
    const from = actor.node.rotation.y
    const gap = Math.atan2(Math.sin(angle - from), Math.cos(angle - from))
    actor.node.rotation.y = from + gap * Math.min(delta * 7.4, 1)
  }
  const walk = (actor: Actor, route: T.Vector3[], speed: number, delta: number, loop: boolean) => {
    if (actor.wait > 0) { actor.wait -= delta; return false }
    const goal = route[actor.routeIndex]
    if (!goal) return false
    difference.copy(goal).sub(actor.node.position)
    difference.y = 0
    const distance = difference.length()
    if (distance < .09) {
      actor.routeIndex = loop ? (actor.routeIndex + 1) % route.length : actor.routeIndex + 1
      actor.wait = loop ? (actor.routeIndex % 2 === 0 ? 1.65 : .25) : .10
      return false
    }
    turn(actor, Math.atan2(difference.x, difference.z), delta)
    actor.node.position.addScaledVector(difference, Math.min(delta * speed, distance) / distance)
    return true
  }
  const update = (delta: number, step: number, focus: Place | 'report' | null, camera: T.Camera, colleagueSpeaking: boolean) => {
    time += delta
    for (const actor of actors) {
      const { id, node } = actor
      const current = id === 'maria' || id === 'stas' || (id === 'irina' && step === 6) || ((id === 'danya' || id === 'mother') && step === 9)
      node.visible = current
      if (!current) continue
      const spoken = (id === 'maria' && (focus === 'maria' || focus === 'report'))
        || (id === 'irina' && focus === 'laptop') || ((id === 'danya' || id === 'mother') && focus === 'danya')
        || (id === 'stas' && colleagueSpeaking)
      const nearby = Math.hypot(camera.position.x - node.position.x, camera.position.z - node.position.z) < 2.08
      const face = Math.atan2(camera.position.x - node.position.x, camera.position.z - node.position.z)
      let motion: Motion = 'idle'
      if (id === 'maria') {
        if (step >= 3 && actor.routeIndex < routes.maria.length) {
          node.position.copy(routes.maria.at(-1)!)
          node.rotation.y = 0
          actor.routeIndex = routes.maria.length
        }
        if (spoken) motion = 'speak'
        else if (actor.routeIndex >= routes.maria.length) {
          motion = nearby ? 'idle' : 'sit'
          turn(actor, nearby ? face : 0, delta)
        } else if (walk(actor, routes.maria, 1.32, delta, false)) motion = 'walk'
      } else if (id === 'stas') {
        if (spoken) motion = 'speak'
        else if (!nearby && walk(actor, routes.stas, 1.15, delta, true)) motion = 'walk'
        else if (!nearby && actor.wait > .7) motion = 'busy'
      } else if (spoken && id !== 'mother') motion = 'speak'
      else if (!nearby && (id === 'irina' || id === 'mother')) motion = 'busy'
      if (spoken || (nearby && motion !== 'walk')) turn(actor, face, delta * .55)
      const relative = Math.atan2(Math.sin(face - node.rotation.y), Math.cos(face - node.rotation.y))
      actor.animate(delta, time, motion, nearby || spoken ? T.MathUtils.clamp(relative, -.72, .72) : 0)
    }
  }
  return { update, stas: person('stas').node, count: actors.length }
}
