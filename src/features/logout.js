import React, { useState } from 'react';

export default function Logout({ onLogout }) {
  const onSubmit = (e) => {
    e.preventDefault();
    onLogout();
  }
  return (
    <button type="button" onClick={e => onLogout()}>LOGOUT</button>
  )
}