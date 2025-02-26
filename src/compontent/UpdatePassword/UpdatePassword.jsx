import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
export default function UpdatePassword () {
  let navigate = useNavigate()
  let [errormessage, setError] = useState(null)
  const baseurl = 'https://ecommerce.routemisr.com'

  let vaildYup = Yup.object({
    email: Yup.string().required('email Required').email('enter vaild Email'),

    newPassword: Yup.string()
      .required('newPassword Required')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'newPassword invaild'
      )
  })
  let Loginform = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },

    onSubmit: UpdatePasswordApi,
    validationSchema: vaildYup
  })

  async function UpdatePasswordApi (data) {
    axios
      .put(`${baseurl}/api/v1/auth/resetPassword`, data)
      .then(req => {
        console.log(req.data)
        if (req.data.token) {
          navigate('/Login')
        }
      })
      .catch(err => {
        setError(err.response.data.message)
        console.log(err.response.data.message)
      })
  }

  return (
    <div>
      
      <Helmet>
        <title> Update Password</title>
      </Helmet>
      <h2>UpdatePassword </h2>
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
      <form onSubmit={Loginform.handleSubmit} className=' w-7/12 mx-auto'>
        <div className='   mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your Email
          </label>
          <input
            value={Loginform.values.email}
            onChange={Loginform.handleChange}
            onBlur={Loginform.handleBlur}
            type='email'
            name='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {Loginform.touched.email && Loginform.errors.email ? (
            <p className='text-red-950'>{Loginform.errors.email}</p>
          ) : (
            ''
          )}
        </div>
        <div className='   mb-5'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            newPassword
          </label>
          <input
            value={Loginform.values.newPassword}
            onChange={Loginform.handleChange}
            onBlur={Loginform.handleBlur}
            type='password'
            name='newPassword'
            id='newPassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {Loginform.touched.newPassword && Loginform.errors.newPassword ? (
            <p className='text-red-950'>{Loginform.errors.newPassword}</p>
          ) : (
            ''
          )}
        </div>
        <br />

        <button
          disabled={!(Loginform.isValid && Loginform.dirty)}
          type='submit'
          className='text-white  disabled:bg-active disabled:bg-opacity-25 bg-active hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-active dark:focus:ring-blue-800'
        >
          UpdatePassword
        </button>
      </form>
    </div>
  )
}
