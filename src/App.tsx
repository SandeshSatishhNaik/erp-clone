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

  if (currentView === 'erp-login') {
    return (
      <ERPLogin
        onBackToHome={() => setCurrentView('home')}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentView === 'erp-dashboard') {
    return (
      <StudentDashboard
        student={student}
        onLogout={() => setCurrentView('erp-login')}
        onBackToHome={() => setCurrentView('home')}
      />
    );
  }

  return <GmuHome onNavigateERP={() => setCurrentView('erp-login')} />;
}

export default App;
