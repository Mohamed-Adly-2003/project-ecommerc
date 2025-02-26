import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContextProvider.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { getActiveElement } from 'formik'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart () {
  let { getUserCart, removeuserCart, setnumsCartItems, clearuserCart } =
    useContext(CartContext)
  let [cartData, setcartData] = useState(null)
  let [loading, setloading] = useState(true)
  useEffect(() => {
    getcartdata()
  }, [])

  function getcartdata () {
    setloading(true)
    getUserCart()
      .then(req => {
        console.log(req.data.data)
        setcartData(req.data.data)
        setloading(false)
      })
      .catch(err => {
        console.log(err)
        setloading(false)
      })
  }
  if (loading) {
    return (
      <div className='bg-slate-300 flex justify-center items-center h-screen'>
        <span className='loader'></span>
      </div>
    )
  }

  function removeItem (id) {
    removeuserCart(id)
      .then(req => {
        console.log(req)
        setnumsCartItems(req.data.numOfCartItems)
        setcartData(req.data.data)
        toast.success('product Deleted')
      })
      .catch(err => {
        console.log(err)
      })
  }
  function clearitems () {
    clearuserCart().then(req => {
      console.log(req)
      if (req.data.message == 'success') {
        setcartData(null)
        setnumsCartItems(null)
      }
    })
  }
  function updatecount (id, count) {
    document.getElementById(id).innerHTML =
      '<i class="fa-solid fa-spinner fa-spin text-active"></i>'

    updateuserCart(id, count).then(req => {
      console.log(req)
      setcartData(req.data.data)
      document.getElementById(id).innerHTML = count
    })
  }
  return (
    
    <>
      
      <Helmet>
        <title> Cart</title>
      </Helmet>
      <Toaster />
      {cartData?.products.length > 0 ? (
        <div className='w-10/12 mx-auto my-5'>
          <div className='bg-gray-200'>
            <h1 className='text-2x1'>shop Cart</h1>
            <div className=' flex justify-between'>
              <h2 className='text-2x1 text-active'>
                Total Cart price : {cartData.totalCartPrice}EGP{' '}
              </h2>
              <button
                onClick={clearitems}
                className='bg-red-600 text-white px-3 py-2 rounded'
              >
                clear Cart
              </button>
            </div>

            <div className='divide-y-2  divide-gray-300'>
              {cartData.products.map(item => {
                return (
                  <div key={item._id} className='flex py-3 items-center'>
                    <div className='w-10/12'>
                      <div className='flex justify-around'>
                        <div className='w-1/12'>
                          <img
                            src={item.product.imageCover}
                            alt=''
                            className='w-full'
                          />
                        </div>
                        <div className='w-11/12'>
                          <h2>{item.product.title} </h2>
                          <h2 className='text-active my-3 '>
                            price : {item.price} EGP
                          </h2>
                          <button
                            onClick={() => {
                              removeItem(item.product._id)
                            }}
                            className='border border-red-500 px-5 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white '
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='w-2/12'>
                      <i
                        onClick={() => {
                          updatecount(item.product._id, item.count + 1)
                        }}
                        className='fa-solid rounded border border-active p-2  fa-plus'
                      ></i>

                      <span id={item.product._id} className='mx-2'>
                        {item.count}
                      </span>
                      <i
                        onClick={() => {
                          updatecount(item.product._id, item.count - 1)
                        }}
                        className='fa-solid rounded border border-active p-2  fa-minus'
                      ></i>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              to={'/ShippingDetails/' + cartData._id}
              className='btn block text-center'
            >
              pay <i className='fa-brands fa-cc-visa'></i>{' '}
            </Link>
          </div>
        </div>
      ) : (
        <div className='bg-red-500 text-center'>No Data</div>
      )}
    </>
  )
}
