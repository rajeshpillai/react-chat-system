import React, { useState, useEffect } from 'react';

export default function Chat({ from, to, defaultMessages, onTalk }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log("defaultMessages: ", defaultMessages);
    setMessages([...messages, ...defaultMessages]);
  }, [defaultMessages]);


  const talk = (e) => {
    //setMessages([...messages, message]);
    onTalk({ from, to, message: message });
    e.target.value = '';
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onKeyUp = (e) => {
    if (e.ctrlKey && e.which === 13) {
      talk(e);
    }
  }


  return (
    <div className="chat-window">
      <h2>Chat Window {from}->{to}</h2>
      <ul className="message-list">
        {messages.map((m, i) => {
          return (
            <li className="message-item" key={i}><span>{m.from}</span><span>
              {m.message}</span></li>
          );
        })}
      </ul>
      <div className="chat-input-area">
        <textarea onChange={handleChange} onKeyUp={onKeyUp}></textarea>
        <button onClick={talk}>send</button>
      </div>
    </div>
  )
}