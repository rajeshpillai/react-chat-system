import React, { useState } from 'react';
import './App.css';
import Login from './features/login';
import Home from './features/home';
import Logout from './features/logout';

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  const onLogin = (username, password) => {
    return validate(username, password);
  }

  const onLogout = () => {
    setLogin(false);
  }

  const validate = (username, password) => {
    setLogin(true);
    return true;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CHAT APP</h1>
        {isLoggedIn && <Logout onLogout={onLogout} />}
      </header>
      <div>
        <p>
          {!isLoggedIn && <Login onLogin={onLogin} />}
          {isLoggedIn && <Home />}
        </p>
      </div>
    </div>
  );
}

export default App;
