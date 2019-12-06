import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './features/login';
import Home from './features/home';
import Logout from './features/logout';
import io from 'socket.io-client';
import Chat from './features/chat';
import UserList from './features/user-list';


const socket = io('localhost:7777');

function getRandomUser() {
  return `a${(+new Date()).toString().substr(8)}`;
}

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [username, setUser] = useState();
  const [chatlist, setChatList] = useState([]);
  const [conversations, setConversations] = useState([]);

  // temporary
  useEffect(() => {
    onLogin(getRandomUser(), "xyz");
  }, []);

  const onLogin = (username, password) => {
    let result = validate(username, password);
    if (result) {
      setUser(username);
      socket.emit("on_new_user_joined", username, function (data) {
        console.log('on_new_user_joined: ', data);
      });
    }
    return result;
  }

  useEffect(() => {
    socket.on("on_get_users", function (data) {
      //console.log('get users: ', data);
      setUsers(data);
    });
  }, [users]);

  useEffect(() => {
    socket.on("user_has_joined", function (uname) {
      console.log('chatting with: ', uname);
      setChatList([...chatlist, uname]);
    });
  }, [chatlist]);

  //todo
  useEffect(() => {
    socket.on("on_message_received", function (message) {
      console.log("message received: ", message);
      setConversations([...conversations, message]);
    });
  }, []);



  const onLogout = () => {
    setLogin(false);
    socket.emit("logout", username)
  }

  const validate = (username, password) => {
    setLogin(true);
    return true;
  }

  const chat = (otherUser) => {
    // Check if chat window already open
    let w = chatlist.find((w) => w === otherUser);
    console.log('chatwindow: ', w);
    if (w !== undefined) return;

    setChatList([...chatlist, otherUser]);
    socket.emit("chat_window_open", { from: username, to: otherUser })
  }

  const talk = (message) => {
    setConversations([message])
    socket.emit("send_message", message);
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
          {isLoggedIn && <Home username={username} />}
        </div>
      </div>

      <div className="content">
        <UserList isLoggedIn={isLoggedIn}
          currentUser={username}
          users={users}
          onChat={chat}
        />

        <div className="chat-area">
          {chatlist.map((otherUser, index) => {
            console.log('talkedTo:', otherUser);
            let talks = conversations.filter(t => t.to === otherUser || t.from === otherUser)
            return (
              <Chat
                key={index}
                from={username}
                to={otherUser}
                defaultMessages={talks}
                onTalk={talk} />
            )
          })}
        </div>
      </div>

    </div >
  );
}

export default App;
