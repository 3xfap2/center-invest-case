// Игрок от первого лица. Пол плоский (y = 0), столкновения по прямоугольникам в плоскости XZ.
import * as THREE from 'three';
import { input, isTouch } from './input.js';

const EYE = 1.6;
const RADIUS = 0.3;
const SPEED = 2.8;
const SENS = isTouch ? 0.0042 : 0.0024;

export class Player {
  constructor(camera) {
    this.camera = camera;
    this.pos = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.colliders = []; // {minX, maxX, minZ, maxZ, enabled?}
    this.stillTime = 0; // сколько секунд игрок не двигается
    this.bob = 0;
    camera.rotation.order = 'YXZ';
  }

  place({ x, z, yaw = 0 }) {
    this.pos.set(x, 0, z);
    this.yaw = yaw;
    this.pitch = 0;
    this.stillTime = 0;
    this.apply();
  }

  update(dt) {
    const { dx, dy } = input.takeLook();
    this.yaw -= dx * SENS;
    this.pitch -= dy * SENS;
    this.pitch = Math.max(-1.35, Math.min(1.35, this.pitch));

    const { x, y } = input.move;
    if (x !== 0 || y !== 0) {
      const sin = Math.sin(this.yaw);
      const cos = Math.cos(this.yaw);
      // вперёд по камере: -Z при yaw = 0
      const vx = (x * cos - y * sin) * SPEED * dt;
      const vz = (-x * sin - y * cos) * SPEED * dt;
      this.moveAxis(vx, 0);
      this.moveAxis(0, vz);
      this.stillTime = 0;
      this.bob += dt * 9;
    } else {
      this.stillTime += dt;
    }
    this.apply();
  }

  moveAxis(vx, vz) {
    const nx = this.pos.x + vx;
    const nz = this.pos.z + vz;
    for (const c of this.colliders) {
      if (c.enabled === false) continue;
      if (nx + RADIUS > c.minX && nx - RADIUS < c.maxX && nz + RADIUS > c.minZ && nz - RADIUS < c.maxZ) return;
    }
    this.pos.x = nx;
    this.pos.z = nz;
  }

  apply() {
    const bobY = Math.sin(this.bob) * 0.025;
    this.camera.position.set(this.pos.x, EYE + bobY, this.pos.z);
    this.camera.rotation.set(this.pitch, this.yaw, 0);
  }

  snapshot() {
    return { x: +this.pos.x.toFixed(2), z: +this.pos.z.toFixed(2), yaw: +this.yaw.toFixed(3) };
  }
}
