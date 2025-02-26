import React from 'react'
import useApi from '../../Hooks/useApi'
import { Helmet } from 'react-helmet'

export default function brands () {
  let { data, isLoading, Error } = useApi('brands')
  if (isLoading) {
    return <h2>Loading.........................</h2>
  }
  if (Error) {
    return <h2>Error.......................</h2>
  }
  return (
    <>
      <Helmet>
  <title> Brands</title>
</Helmet>

      <div className='flex flex-wrap'>
        {data?.data?.data?.map(brands => {
          return (
            <div key={brands._id} className='w-3/12'>
              <img
                src={brands.image}
                className='h-48 w-full object-contain object-top '
                alt=''
              />
              <h5 className='text-center'>{brands.name} </h5>
            </div>
          )
        })}
      </div>
    </>
  )
}
