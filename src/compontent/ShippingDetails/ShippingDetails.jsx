import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ShippingDetails () {
  let { id } = useParams()
  const headerOpitions = {
    headers: {
      token: localStorage.getItem('token')
    }
  }

  let Shippingformik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: ''
    },
    onSubmit: chekOutSession
  })
  function chekOutSession (value) {
    let data = {
      shippingAdderss: value
    }
    axios
      .post(
        ` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/67a0916e52e8e0ca3d2cd1ea?url=http://localhost:5173`,
        data,
        headerOpitions
      )
      .then(response => {
        window.open(response.data.session.url, '_blank', "width=400,height=400")
        console.log(response.data.session.url)
      })
  }
  return (
    <div className='w-7/12 mx-auto'>
      <h1>Shipping Details</h1>
      <form onSubmit={Shippingformik.handleSubmit}>
        <div className='mb-5'>
          <label
            htmlFor='details'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your details
          </label>
          <input
            value={Shippingformik.values.details}
            onChange={Shippingformik.handleChange}
            onBlur={Shippingformik.handleBlur}
            type='text'
            name='details'
            id='details'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {Shippingformik.touched.details && Shippingformik.errors.details ? (
            <p className='text-red-950'>{Shippingformik.errors.details}</p>
          ) : (
            ''
          )}
        </div>
        <div className='   mb-5'>
          <label
            htmlFor='city'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your city
          </label>
          <input
            value={Shippingformik.values.city}
            onChange={Shippingformik.handleChange}
            onBlur={Shippingformik.handleBlur}
            type='city'
            name='city'
            id='city'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {Shippingformik.touched.city && Shippingformik.errors.city ? (
            <p className='text-red-950'>{Shippingformik.errors.city}</p>
          ) : (
            ''
          )}
        </div>

        <div className='   mb-5'>
          <label
            htmlFor='phone'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your phone
          </label>
          <input
            value={Shippingformik.values.phone}
            onChange={Shippingformik.handleChange}
            onBlur={Shippingformik.handleBlur}
            type='tel'
            name='phone'
            id='phone'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {Shippingformik.touched.phone && Shippingformik.errors.phone ? (
            <p className='text-red-950'>{Shippingformik.errors.phone}</p>
          ) : (
            ''
          )}
        </div>
        <button className='btn'>pay</button>
      </form>
    </div>
  )
}
