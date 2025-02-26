import React from 'react'
import useApi from '../../Hooks/useApi'
import { Helmet } from 'react-helmet'

export default function Category () {
  let { data, isLoading, Error } = useApi('Categories')
  if (isLoading) {
    return <h2>Loading.........................</h2>
  }
  if (Error) {
    return <h2>Error.......................</h2>
  }
  return (
    <>
      <Helmet>
        <title> Categories</title>
      </Helmet>

      <div className='flex flex-wrap'>
        {data?.data?.data?.map(category => {
          return (
            <div key={category._id} className='w-3/12'>
              <img
                src={category.image}
                className='h-48 w-full object-contain object-top '
                alt=''
              />
              <h5 className='text-center'>{category.name} </h5>
            </div>
          )
        })}
      </div>
    </>
  )
}
