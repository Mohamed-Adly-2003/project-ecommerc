import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import toast, { Toaster } from 'react-hot-toast'
import { CartContext } from '../Context/CartContextProvider.jsx'

export default function ProductDetails () {
  let { id } = useParams()
  let { adduserCart, setnumsCartItems } = useContext(CartContext)
  let { isLoading, data, error } = useQuery({
    queryKey: ['ProductDetails', id],
    queryFn: function () {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
  })

  function changeImge (e) {
    let imgsrc = e.target.getAttribute('src')
    document.getElementById('myImage').setAttribute('src', imgsrc)
  }
  let product = data?.data?.data
  function addCart (id) {
    adduserCart(id)
      .then(req => {
        console.log(req)
        setnumsCartItems(req.data.numOfCartItems)
        
        toast.success(req.data.message)
      })
      .catch(err => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <>
      <Toaster></Toaster>
      {isLoading ? (
        <div className='bg-slate-300 flex justify-center items-center h-screen'>
          <span class='loader'></span>
        </div>
      ) : (
        <div className='w-10/12 mx-auto my-5'>
          <div className='flex  justify-between  items-center '>
            <div className='w-3/12'>
              <img
                src={product?.imageCover}
                id='myImage'
                className='w-full'
                alt=''
              />
              <div className='flex'>
                {product?.images.map((imge, i) => {
                  return (
                    <div key={i}>
                      <img
                        onClick={changeImge}
                        src={imge}
                        className='w-full'
                        alt=''
                      />
                    </div>
                  )
                })}
              </div>
              {/* <Slider dots>
                      {product?.images.map((imge, i) => {
                          return (
                              <div key={i}>
                                  <img src={imge} className='w-full' alt='' />
                              </div>
                          )
                      })}
                  </Slider> */}
            </div>
            :
            <div className='w-8/12'>
              <h2>{product?.title}</h2>
              <p className='text-gray-500  my-5'>{product?.description}</p>
              <div className='flex justify-between'>
                <span>{product?.price}EGP</span>
                <span className='fa-solid fa-star text-yellow-300'>
                  {product?.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => {
                  addCart(id)
                }}
                className='btn mt-5     '
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
