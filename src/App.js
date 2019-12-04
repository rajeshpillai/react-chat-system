import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './features/login';
import Home from './features/home';
import Logout from './features/logout';
import io from 'socket.io-client';


function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [username, setUser] = useState();
  let socket = io('localhost:7777');

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

  socket.on("get users", function (data) {
    console.log('get users: ', data);
    //setUsers(data);
  });

  const onLogout = () => {
    setLogin(false);
    socket.emit("logout", username)
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
        {!isLoggedIn && <Login onLogin={onLogin} />}
        {isLoggedIn && <Home />}
      </div>
      <div>
        {users && users.map((u) => {
          return <li>{u}</li>
        })}
      </div>
    </div>
  );
}

export default App;
