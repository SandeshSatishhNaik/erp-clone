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

  return <>{view}</>;
}

export default App;
