import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export let CartContext = createContext()
export default function CartContextProvider ({ children }) {
  let [numsCartItems, setnumsCartItems] = useState(null)
  const baseUrl = ' https://ecommerce.routemisr.com/api/v1/cart'
  const headerOpitions = {
    headers: {
      token: localStorage.getItem('token')
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserCart().then(req => {
        console.log(req.data.numOfCartItems)
        setnumsCartItems(req.data.numOfCartItems)
      })
    }
  }, [])
  function getUserCart () {
    return axios.get(baseUrl, headerOpitions)
  } 
  function adduserCart (id) {
    let data = {
      productId: id
    }
    return axios.post(baseUrl, data, headerOpitions)
  }
  function removeuserCart (id) {
    return axios.delete(`${baseUrl}/${id}`, headerOpitions)
  }
  function clearuserCart () {
    return axios.delete(`${baseUrl}`, headerOpitions)
  }
  function updateuserCart (id, count) {
    let data = {
      count: count
    }
    return axios.put(`${baseUrl}/${id}`, data, headerOpitions)
  }

  return (
    <CartContext.Provider
      value={{
        getUserCart,
        numsCartItems,
        setnumsCartItems,
        adduserCart,
        removeuserCart,
        clearuserCart,
        updateuserCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
