import React from 'react'
import { Link } from 'react-router-dom'

export const Setting = () => {
  return (
    <div className='felx w-200 justify-center items-center bg-emerald-500'>
      
      <h1>Setting page</h1>
      <Link 
      to={"/brightness"}
      >
      <button className='bg-white rounded-2xl py-2 px-1 mt-10 mb-2 hover:transition-all duration-200 hover:scale-110 ml-10'>
        Go to another page for testing
      </button>
      </Link>
      
      </div>
  )
}
