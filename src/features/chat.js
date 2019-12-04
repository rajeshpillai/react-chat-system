import React, { useState, useEffect } from 'react';

export default function Chat({ from, to, defaultMessages, onTalk }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log("defaultMessages: ", defaultMessages);
    setMessages([...messages, ...defaultMessages]);
  }, [defaultMessages]);


  const talk = () => {
    //setMessages([...messages, message]);
    onTalk({ from, to, message: message });
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className="chat-window">
      <h2>Chat Window {from}->{to}</h2>
      <ul className="messages">
        {messages.map((m, i) => {
          return (
            <li key={i}><span>{m.from}</span><span>
              {m.message}</span></li>
          );
        })}
      </ul>
      <textarea onChange={handleChange}></textarea>
      <button onClick={talk}>send</button>
    </div>
  )
}