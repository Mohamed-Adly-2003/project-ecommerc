import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
export let AuthContext = createContext()
export default function AuthContextProvider ({ children }) {
  let [token, setToken] = useState(null)
  useEffect(() => {
    let tokenStorege = localStorage.getItem('token')
    if (tokenStorege) {
      setToken(tokenStorege)
    }
  }, [])
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
