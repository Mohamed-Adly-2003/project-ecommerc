import axios from 'axios'
import React, { useContext, useState } from 'react'
import MinSilder from '../MinSilder/MinSilder.jsx'
import CategorySilder from '../CategorySilder/CategorySilder.jsx'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../Context/CartContextProvider.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Home () {
  let [Page, setPages] = useState('2')
  let { adduserCart, setnumsCartItems } = useContext(CartContext)
  function getAllProducts () {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${Page}`
    )
  }
  let { data, isError, isLoading, error } = useQuery({
    queryKey: ['products', Page],
    queryFn: getAllProducts
  })

  let nums = []
  for (let i = 1; i <= data?.data?.metadata?.numberOfPages; i++) {
    nums.push(i)
  } 

  function getPagesNumber (e) {
    let page = e.target.getAttribute('page')
    setPages(page)
  }
  if (isError) {
    return <h2 className='text-red-600'>{error.response.data.message}</h2>
  }
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
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Toaster />
      {isLoading ? (
        <div className='bg-slate-300 flex justify-center items-center h-screen'>
          <span class='loader'></span>
        </div>
      ) : (
        <div className='w-10/12 mx-auto my-6'>
          <MinSilder></MinSilder>
          <CategorySilder></CategorySilder>
          <div className='flex flex-wrap'>
            {data?.data?.data?.map(prodcut => {
              let { _id, title, imageCover, price, category, ratingsAverage } =
                prodcut
              let { name } = category
              return (
                <div
                  key={_id}
                  className='lg:w-2/12 md:3/12 sm:w6/12 w-full px-2 mb-3'
                >
                  <div className='item group overflow-hidden hover:border text - active hover:border-main p-2'>
                    <Link to={`/ProductDetails/${_id}`}>
                      <img src={imageCover} alt={title} className='w-full' />
                      <h5 className='text-active'>{name}</h5>
                      <h2 className=''>
                        {title.split(' ').slice(0, 2).join(' ')}
                      </h2>
                      <div className='flex justify-between'>
                        <span>{price}EGP</span>
                        <span className='fa-solid fa-star text-yellow-300'>
                          {ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addCart(_id)}
                      className='btn mt-3  translate-y-24  duration-500 group-hover:translate-y-0 '
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <nav aria-label='Page navigation example'>
            <ul className='flex items-center justify-center -space-x-px text-sm'>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  Previous
                </a>
              </li>
              {new Array(data?.data?.metadata?.numberOfPages)
                .fill('')
                .map((el, i) => {
                  return (
                    <li onClick={getPagesNumber} key={el}>
                      <a
                        Page={i + 1}
                        className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        {i + 1}
                      </a>
                    </li>
                  )
                })}

              <a className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                Next
              </a>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

/*
function getAllProducts (page = 1) {
  setloding(true)
  axios
    .get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`
    )
    .then(req => {
      setprodcutList(req.data.data)
      console.log(req.data.metadata.numberOfPages)
      let nums = []
      for (let i = 1; i < req.data.metadata.numberOfPages; i++) {
        nums.push(i)
      }
      setNumsPages(nums)
      console.log(nums)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setloding(false)
    })
}

useEffect(() => {
  getAllProducts()
}, [])


*/
