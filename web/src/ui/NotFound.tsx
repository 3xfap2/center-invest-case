import type { ReactNode } from 'react';
import { EmptyStar, Link, TopBar } from './parts';

/** The 404 page and the empty-results page share one layout. */
export function EmptyState({ icon, title, text, action }: { icon: '404' | 'stars'; title: string; text: string; action: ReactNode }) {
  return (
    <div className="pn-screen" style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div className="pn-grid-bg" aria-hidden="true" />
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 48, paddingBottom: 120 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 760 }}>
          {icon === '404' ? (
            <p aria-hidden="true" style={{ margin: 0, font: "800 clamp(140px, 20vw, 240px)/0.8 var(--pn-font-display)", fontStretch: '75%', color: 'transparent', WebkitTextStroke: '2px #3D5545', letterSpacing: '-0.01em' }}>
              404
            </p>
          ) : (
            <div aria-hidden="true" style={{ display: 'flex', gap: 14 }}>
              <EmptyStar />
              <EmptyStar />
              <EmptyStar />
            </div>
          )}
          <h1 className="pn-h1">{title}</h1>
          <p className="pn-hint" style={{ fontSize: 18 }}>
            {text}
          </p>
          <div style={{ marginTop: 8 }}>{action}</div>
        </div>
      </main>
    </div>
  );
}

export function NotFound() {
  return (
    <EmptyState
      icon="404"
      title="Такой страницы нет"
      text="Похоже, ссылка устарела или в ней опечатка."
      action={
        <Link to="/" className="pn-btn pn-btn--green pn-btn--lg">
          <span aria-hidden="true">←</span> На главную
        </Link>
      }
    />
  );
}
