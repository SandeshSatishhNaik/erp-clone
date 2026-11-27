import { useState } from 'react';
import { GmuHome } from './components/GmuHome';
import { ERPLogin } from './components/ERPLogin';
import { StudentDashboard } from './components/StudentDashboard';
import { MOCK_STUDENT } from './data/mockData';
import type { StudentProfile } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'erp-login' | 'erp-dashboard'>('home');
  const [student, setStudent] = useState<StudentProfile>(MOCK_STUDENT);

  const handleLoginSuccess = (loggedIn: StudentProfile) => {
    setStudent(loggedIn);
    setCurrentView('erp-dashboard');
  };

  const view =
    currentView === 'erp-login' ? (
      <ERPLogin
        onBackToHome={() => setCurrentView('home')}
        onLoginSuccess={handleLoginSuccess}
      />
    ) : currentView === 'erp-dashboard' ? (
      <StudentDashboard
        student={student}
        onLogout={() => setCurrentView('erp-login')}
        onBackToHome={() => setCurrentView('home')}
      />
    ) : (
      <GmuHome onNavigateERP={() => setCurrentView('erp-login')} />
    );

  return (
    <>
      <DemoBanner />
      {view}
    </>
  );
}

/** Small fixed corner marker so this clone is never mistaken for the real GMU portal. */
function DemoBanner() {
  return (
    <div
      title="Demo / portfolio project — not affiliated with GM University. Do not enter real credentials."
      style={{
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        zIndex: 2147483647,
        background: 'rgba(17,24,39,0.88)',
        color: '#fff',
        font: '600 10px/1.3 system-ui, sans-serif',
        padding: '4px 8px',
        borderRadius: '6px',
        letterSpacing: '0.03em',
        pointerEvents: 'none',
        maxWidth: '150px',
      }}
    >
      DEMO · not GMU's real site
    </div>
  );
}

export default App;
