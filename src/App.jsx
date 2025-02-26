import React, { useState } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './compontent/Home/Home'
import Cart from './compontent/Cart/Cart'
import Product from './compontent/Product/Product'
import Login from './compontent/login/login'
import Brands from './compontent/Brand/Brands'
import Signup from './compontent/Signup/Signup'
import Category from './compontent/Category/Category'
import Notfound from './compontent/Notfound/Notfound'
import Layout from './compontent/Layout/Layout'
import ForgetPassowrd from './compontent/ForgetPassowrd/ForgetPassowrd'
import ProductDetails from './compontent/ProductDetails/ProductDetails'
import UpdatePassword from './compontent/UpdatePassword/UpdatePassword'
import AuthContextProvider from './compontent/Context/AuthContextProvider'
import CartContextProvider from './compontent/Context/CartContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ShippingDetails from './compontent/ShippingDetails/ShippingDetails'
import { Offline, Online } from 'react-detect-offline'

export default function App () {
  // let [Count,setCount]= useState(0)
  const router = createHashRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'Cart', element: <Cart /> },
        { path: 'login', element: <Login /> },
        { path: 'Product', element: <Product /> },
        { path: 'Signup', element: <Signup /> },
        { path: 'ShippingDetails/:id', element: <ShippingDetails /> },
        { path: 'Brands', element: <Brands /> },
        { path: 'Category', element: <Category /> },
        { path: 'ProductDetails/:id', element: <ProductDetails /> },
        { path: 'ForgetPassowrd', element: <ForgetPassowrd /> },
        { path: 'UpdatePassword', element: <UpdatePassword /> },
        { path: '**', element: <Notfound /> }
      ]
    }
  ])
  let Client = new QueryClient()
  return (
    <>
      <Online>
        <QueryClientProvider client={Client}>
          <ReactQueryDevtools></ReactQueryDevtools>
          <AuthContextProvider>
            <CartContextProvider>
              <RouterProvider router={router} />
            </CartContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </Online>

      <Offline>
        <div className='fixed bottom-8 left-7  p-4 bg-red-700 rounded'>
          You re Ofline right now. Check connection.?
        </div>
      </Offline>
    </>
  )
}
