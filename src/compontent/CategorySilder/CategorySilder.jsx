import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import useApi from '../../Hooks/useApi'

export default function () {
  let { data } = useApi('categories')
  return (
    <div>
      <Slider slidesToShow={6} autoplay infinite speed={500} slidesToScroll={3}>
        {data?.data?.data?.map(category => {
          return (
            <div key={category._id}>
              <img
                src={category.image}
                className='h-48 w-full object-contain object-top '
                alt=''
              />
              <h5 className='text-center'>{category.name} </h5>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
