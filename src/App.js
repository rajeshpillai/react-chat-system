import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './features/login';
import Home from './features/home';
import Logout from './features/logout';
import io from 'socket.io-client';


const socket = io('localhost:7777');

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [username, setUser] = useState();

  const onLogin = (username, password) => {
    let result = validate(username, password);
    if (result) {
      setUser(username);
      socket.emit("new user", username, function (data) {
        console.log('new user: ', data);
      });
    }
    return result;
  }

  useEffect(() => {
    socket.on("get users", function (data) {
      console.log('get users: ', data);
      setUsers(data);
    });
  }, [users]);

  const onLogout = () => {
    setLogin(false);
    socket.emit("logout", username)
  }

  const validate = (username, password) => {
    setLogin(true);
    return true;
  }

  return (
    <div className="app">
      <div className="header">
        <header className="app-header">
          <h1>CHAT APP</h1>
          {isLoggedIn && <Logout onLogout={onLogout} />}
        </header>
        <div className="main">
          {!isLoggedIn && <Login onLogin={onLogin} />}
          {isLoggedIn && <Home />}
        </div>
      </div>
      {isLoggedIn && <ul className="user-list">
        {users && users.map((u) => {
          return <li className="user-item">{u}</li>
        })}
      </ul>
      }
    </div >
  );
}

export default App;
