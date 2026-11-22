import { AchievementBoard } from './AchievementBoard';
import { Link, TopBar } from './parts';

/** «Зал славы» on its own page, opened from the landing's top menu. */
export function Hall() {
  return (
    <div className="pn-screen" style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div className="pn-grid-bg" aria-hidden="true" />
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 1, flex: 1, paddingTop: 24, paddingBottom: 96 }}>
        <Link to="/" className="pn-back" data-testid="hall-back">
          <span aria-hidden="true">←</span> На главную
        </Link>
        <AchievementBoard />
      </main>
    </div>
  );
}
