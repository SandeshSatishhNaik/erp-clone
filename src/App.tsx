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

/** Fixed banner shown on every view so this clone is never mistaken for the real GMU portal. */
function DemoBanner() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
        background: '#b91c1c',
        color: '#fff',
        font: '600 13px/1.4 system-ui, sans-serif',
        textAlign: 'center',
        padding: '6px 12px',
        letterSpacing: '0.02em',
      }}
    >
      DEMO / portfolio project — not affiliated with GM University. Do not enter real credentials.
    </div>
  );
}

export default App;
