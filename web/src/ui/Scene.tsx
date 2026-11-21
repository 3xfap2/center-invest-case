import chuzhoe from '../scenes/chuzhoe.html?raw';
import dym from '../scenes/dym.html?raw';
import glitch from '../scenes/glitch.html?raw';
import kompas from '../scenes/kompas.html?raw';

/**
 * The four game scenes from the design canvas: static SVG (no scripts), with ambient
 * animation classes (.pn-amb-*) defined in tokens.css. Real WebP frames can replace them later.
 */
export type SceneId = 'chuzhoe' | 'glitch' | 'kompas' | 'dym';
const SCENES: Record<SceneId, string> = { chuzhoe, glitch, kompas, dym };

export function Scene({ id }: { id: SceneId | null }) {
  if (!id) return <div className="pn-scene pn-grid-bg" aria-hidden />;
  return <div className="pn-scene" aria-hidden dangerouslySetInnerHTML={{ __html: SCENES[id] }} />;
}
