import React, { useContext } from 'react'
import logo from '../../assets/loog.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContextProvider'
import { CartContext } from '../Context/CartContextProvider'
import { Helmet } from 'react-helmet'

export default function Navbar () {
  let { token, setToken, userData } = useContext(AuthContext)
  let { numsCartItems } = useContext(CartContext)
  let nag = useNavigate()
  function logout () {
    localStorage.removeItem('token')
    setToken(null)
    nag('/Login')
  }
  return (
    <nav className='bg-white  border-gray-200 dark:bg-gray-900'>
      <Helmet>
        <title> Home</title>
      </Helmet>

      <div className='max-w-screen-xl max-h-full flex flex-wrap items-center justify-center  mx-auto p-4'>
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        ></Link>
        <button
          dlInkta-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className='hidden md:flex  justify-between w-full      md:w-auto'
          id='navbar-default'
        >
          <div className='flex me-20'>
            <img src={logo} className='h-8 me-3 ' alt='' width={100} />
            <h1 className='font-extrabold '>freshCart</h1>
          </div>
          {token ? (
            <ul className='font-medium   flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink
                  to='/'
                  className={x =>
                    x.isActive ? 'blok py-2 text-active ' : 'blok py-2 px-3'
                  }
                  aria-current='page'
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/Product'
                  className={x =>
                    x.isActive ? 'blok py-2 text-active ' : 'blok py-2 px-3'
                  }
                  aria-current='page'
                >
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/Brands'
                  className={x =>
                    x.isActive ? 'blok py-2 text-active ' : 'blok py-2 px-3'
                  }
                  aria-current='page'
                >
                  brand
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/Category'
                  className={x =>
                    x.isActive ? 'blok py-2 text-active ' : 'blok py-2 px-3'
                  }
                  aria-current='page'
                >
                  catgory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/Cart'
                  className={x =>
                    x.isActive ? 'blok py-2 text-active ' : 'blok py-2 px-3'
                  }
                  aria-current='page'
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          ) : (
            ''
          )}

          <ul className='font-medium flex ms-96 flex-col  md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li className='flex gap-3'>
              <a href='#'>
                <i className='fa-brands fa-facebook'></i>
              </a>
              <a href='#'>
                <i className='fa-brands fa-twitter'></i>
              </a>
              <a href='#'>
                <i className='fa-brands fa-instagram'></i>
              </a>
              <a href='#'>
                <i className='fa-brands fa-youtube'></i>
              </a>
            </li>

            {token ? (
              <>
                <li className='relative text-active '>
                  <i className='fa-solid fa-cart-shopping'></i>
                  <span className='absolute top-0 end-0 -translate-y-4 translate-x-3 '>
                    {numsCartItems}
                  </span>
                </li>
                <li>
                  <span className=' flex py-2 px-3 md:p-0' onClick={logout}>
                    Lagout{' '}
                  </span>
                </li>
                <div className='ms-4'>
                  <h1>Hello_Mohamed</h1>
                </div>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to='/Login'
                    className={x =>
                      x.isActive ? 'blok  py-1 text-active ' : 'blok py-2 px-3'
                    }
                    aria-current='page'
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/Signup'
                    className={x =>
                      x.isActive ? 'blok py-2 text-active ' : 'blok py-2 px-3'
                    }
                    aria-current='page'
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
