import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      {!isLoggedIn ? (
        <LandingPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;