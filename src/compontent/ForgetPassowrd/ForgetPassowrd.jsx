import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
export default function ForgetPassowrd () {
  let [errormessage, setError] = useState(null)
  let [formDisplay, setformDisply] = useState(true)
  let navg = useNavigate()
  const baseUrl = 'https://ecommerce.routemisr.com'
  let vaildYup = Yup.object({
    email: Yup.string().required('email Required').email('enter vaild Email')
  })
  let vaild2Yup = Yup.object({
    resetCode: Yup.string().required('resetCode Required')
  })
  let forgetform = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: ForgetPassowrdApi,
    validationSchema: vaildYup
  })
  let revifResetCodeForm = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit: revifResetCodeApi,
    validationSchema: vaild2Yup
  })

  function revifResetCodeApi (data) {
    axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
      .then(res => {
        console.log(res);
        navg('/UpdatePassword')
        
      })
   
  }
  function ForgetPassowrdApi (data) {
    axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
      .then(req => {
        console.log(req.data)
        if (req.data.statusMsg == 'success') {
          setformDisply(false)
        }
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }

  return (
    <>
      <Helmet>
  <title> Forget Password</title>
</Helmet>

      {formDisplay ? (
        <div>
          <h2>ForgetPassowrd </h2>
          {errormessage ? (
            <div
              className='p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {errormessage}
            </div>
          ) : (
            ''
          )}

          <form onSubmit={forgetform.handleSubmit} className=' w-7/12 mx-auto'>
            <div className='   mb-5'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your Email
              </label>
              <input
                value={forgetform.values.email}
                onChange={forgetform.handleChange}
                onBlur={forgetform.handleBlur}
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              {forgetform.touched.email && forgetform.errors.email ? (
                <p className='text-red-950'>{forgetform.errors.email}</p>
              ) : (
                ''
              )}
            </div>

            <button
              disabled={!(forgetform.isValid && forgetform.dirty)}
              type='submit'
              className='text-white  disabled:bg-active disabled:bg-opacity-25 bg-active hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-active dark:focus:ring-blue-800'
            >
              send
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>rest Code </h2>
          {errormessage ? (
            <div
              className='p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {errormessage}
            </div>
          ) : (
            ''
          )}

          <form
            onSubmit={revifResetCodeForm.handleSubmit}
            className=' w-7/12 mx-auto'
          >
            <div className='   mb-5'>
              <label
                htmlFor='resetCode'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your resetCode
              </label>
              <input
                value={revifResetCodeForm.values.resetCode}
                onChange={revifResetCodeForm.handleChange}
                onBlur={revifResetCodeForm.handleBlur}
                type='string'
                name='resetCode'
                id='resetCode'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              {revifResetCodeForm.touched.resetCode &&
              revifResetCodeForm.errors.resetCode ? (
                <p className='text-red-950'>
                  {revifResetCodeForm.errors.resetCode}
                </p>
              ) : (
                ''
              )}
            </div>
            <button
              disabled={
                !(revifResetCodeForm.isValid && revifResetCodeForm.dirty)
              }
              type='submit'
              className='text-white  disabled:bg-active disabled:bg-opacity-25 bg-active hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-active dark:focus:ring-blue-800'
            >
              verify code
            </button>
          </form>
        </div>
      )}
    </>
  )
}
