import React from 'react'
import { Navigate } from 'react-router-dom'
import login from '../login/login'
export default function ProtectedRouteing ({ childern }) {
  if (localStorage.getItem('token')) {
      return childern;
  } else {
    return <Navigate to='/login' />
  }
}
