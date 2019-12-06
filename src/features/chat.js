import React, { useState, useEffect, useRef } from 'react';

export default function Chat({ from, to, defaultMessages, onTalk }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  const chatBodyRef = React.createRef();

  useEffect(() => {
    console.log("defaultMessages: ", defaultMessages);
    setMessages([...messages, ...defaultMessages]);
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight+40;
  }, [defaultMessages]);


  const talk = (e) => {
    //setMessages([...messages, message]);
    onTalk({ from, to, message: message });
    e.target.value = '';
    console.log('scroll:', chatBodyRef.current.scrollHeight);
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight+40;
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onKeyUp = (e) => {
    if ((e.ctrlKey || e.shiftKey) && e.which === 13) {
      return;
    }
    if (e.which === 13) {
      talk(e);
    }
  }


  return (
    <div className="chat-window">
      <h2>Chat Window {from}->{to}</h2>
      <ul className="message-list" ref={chatBodyRef}>
        {messages.map((m, i) => {
          let cn = m.from == from ? "self" : "others";
          return (
            <li className={`message-item ${cn}`} key={i}>
              <span className="message-from">{m.from}</span>
              <div className="message-body">{m.message}</div>
            </li>
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