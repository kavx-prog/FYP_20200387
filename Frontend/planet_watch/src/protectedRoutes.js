import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  let ans = true
  let token = localStorage.getItem('access_token');
  if (token) {
    ans = true
  } else {
    ans = false
  }
  return (
    ans ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute;

