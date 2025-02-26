import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Product () {
  let myInput = useRef()
  useEffect(() => {
    myInput.current.value = " Hello, Mohamed"
    
    myInput.current.focus()
  })
  return (
    <>
      <Helmet>
        <title>Product Page</title>
      </Helmet>
      <div>
        <input type='text' ref={myInput} />
      </div>
    </>
  )
}
