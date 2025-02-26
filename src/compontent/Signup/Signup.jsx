import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Signup () {
  let [errormessage, setError] = useState(null)
  const baseurl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()

  let vaildYup = Yup.object({
    name: Yup.string()
      .required('name Required')
      .min(3, 'min char 2')
      .max(20, 'max char'),
    email: Yup.string().required('email Required').email('enter vaild Email'),
    phone: Yup.string()
      .required('phone Required')
      .matches(/^(20)?01[1250][0-9{8}$]/, 'enter vaild phone'),
    password: Yup.string()
      .required('password Required')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'password invaild'
      ),
    rePassword: Yup.string()
      .required('repassword Required')
      .oneOf([Yup.ref('password')], 'Repassword Not match password')
  })
  let registerform = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      rePassword: ''
    },

    onSubmit: registerApi,
    validationSchema: vaildYup
  })

  async function registerApi (data) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
      .then(req => {
        console.log(req.data)
        if (req.data.message == 'success') {
          navg('/login')
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
        <title> Register</title>
      </Helmet>

      <h2>Register Now</h2>
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

      <form onSubmit={registerform.handleSubmit} className=' w-7/12 mx-auto'>
        <div className='   mb-5'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your name
          </label>
          <input
            value={registerform.values.name}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type='text'
            name='name'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {registerform.touched.name && registerform.errors.name ? (
            <p className='text-red-950'>{registerform.errors.name}</p>
          ) : (
            ''
          )}
        </div>
        <div className='   mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your Email
          </label>
          <input
            value={registerform.values.email}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type='email'
            name='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {registerform.touched.email && registerform.errors.email ? (
            <p className='text-red-950'>{registerform.errors.email}</p>
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
            value={registerform.values.password}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type='password'
            name='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {registerform.touched.password && registerform.errors.password ? (
            <p className='text-red-950'>{registerform.errors.password}</p>
          ) : (
            ''
          )}
        </div>
        <div className='   mb-5'>
          <label
            htmlFor='rePassword'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your repassword
          </label>
          <input
            value={registerform.values.rePassword}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type='Password'
            name='rePassword'
            id='rePassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {registerform.touched.rePassword && registerform.errors.rePassword ? (
            <p className='text-red-950'>{registerform.errors.rePassword}</p>
          ) : (
            ''
          )}
        </div>
        <div className='   mb-5'>
          <label
            htmlFor='phone'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Yourphone
          </label>
          <input
            value={registerform.values.phone}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type='tel'
            name='phone'
            id='phone'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-active dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            // placeholder=''
            // required
          />
        </div>

        <button
          disabled={!(registerform.isValid && registerform.dirty)}
          type='submit'
          className='text-white  disabled:bg-active disabled:bg-opacity-25 bg-active hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-active dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
