import React, { useState, useEffect } from 'react';

export default function UserList({ currentUser, users, isLoggedIn, onChat }) {
  return (
    isLoggedIn && < ul className="user-list" >
      {users && users.map((u) => {
        if (u == currentUser) return;
        return (
          <li className="user-item" key={u}>
            {u} <button className="action-open-chat" onClick={() => onChat(u)}>chat</button>
          </li>
        )
      })
      }
    </ul >
  )
}