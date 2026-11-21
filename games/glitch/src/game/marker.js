// Жёлтый ромб над целью: виден сквозь стены. Используется в главе 2 (в главе 1 своя копия).
import * as THREE from 'three';

export function createMarker() {
  const m = new THREE.MeshBasicMaterial({ color: 0xf2c94c, depthTest: false, depthWrite: false, transparent: true, opacity: 0.92 });
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.22, 4), m);
  top.position.y = 0.11;
  const bottom = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 4), m);
  bottom.rotation.x = Math.PI;
  bottom.position.y = -0.15;
  g.add(top, bottom);
  g.traverse((x) => (x.renderOrder = 999));
  g.visible = false;
  const box = new THREE.Box3();
  const tip = new THREE.Vector3();
  let target = null;

  return {
    // show: можно ли показывать (сложность, катсцена); scene: текущая сцена.
    update(t, newTarget, show, scene) {
      if (!newTarget || !show || !scene) {
        g.visible = false;
        return;
      }
      if (g.parent !== scene) scene.add(g);
      if (newTarget !== target) {
        target = newTarget;
        box.setFromObject(target);
        box.getCenter(tip);
        tip.y = Math.min(box.max.y, 2.4) + 0.45;
      }
      g.visible = true;
      g.position.set(tip.x, tip.y + Math.sin(t * 3) * 0.07, tip.z);
      g.rotation.y = t * 1.5;
    },
    hide() {
      g.visible = false;
    },
    reset() {
      target = null;
    },
    dispose() {
      g.parent?.remove(g);
    },
  };
}
