import React, {useState} from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <div>
        <label>Username</label>
        <input type="text" onChange={e=>setUsername(e.target.value)}/>
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={e=>setPassword(e.target.value)}/>
      </div>
      <button type="submit">LOGIN</button>
    </form>
  )
}