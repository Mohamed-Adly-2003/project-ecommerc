import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContextProvider'
import { Helmet } from 'react-helmet'

export default function login () {
  let { setToken } = useContext(AuthContext)
  let Navigate = useNavigate()
  let [errormessage, setError] = useState(null)
  const baseurl = 'https://ecommerce.routemisr.com'

  let vaildYup = Yup.object({
    email: Yup.string().required('email Required').email('enter vaild Email'),

    password: Yup.string()
      .required('password Required')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'password invaild'
      )
  })
  let Loginform = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: registerApi,
    validationSchema: vaildYup
  })

  async function registerApi (data) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
      .then(req => {
        console.log(req.data)
        if (req.data.message == 'success') {
          localStorage.setItem('token', req.data.token)
          setToken(req.data.token)
          Navigate('/')
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
        <title> login</title>
      </Helmet>

      <h2>login Now</h2>
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
            Your Password
          </label>
          <input
            value={Loginform.values.password}
            onChange={Loginform.handleChange}
            onBlur={Loginform.handleBlur}
            type='password'
            name='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {Loginform.touched.password && Loginform.errors.password ? (
            <p className='text-red-950'>{Loginform.errors.password}</p>
          ) : (
            ''
          )}
        </div>
        <NavLink to='/ForgetPassowrd'> ForgetPassowrd ?</NavLink>
        <br />

        <button
          disabled={!(Loginform.isValid && Loginform.dirty)}
          type='submit'
          className='text-white  disabled:bg-active disabled:bg-opacity-25 bg-active hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-active dark:focus:ring-blue-800'
        >
          login
        </button>
      </form>
    </div>
  )
}
