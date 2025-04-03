import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
 
  return (
    <header>
      <div className='bg-amber-700 flex justify-between items-center p-5 '>
        <h1 className='font-bold text-2xl text-white ml-10'>React Query</h1>
        <div className='flex  justify-center items-center '>
          <ul className='flex flex-row gap-10 text-white text-semibold mr-10'>
            <li>
              <NavLink to='about'>About</NavLink>
            </li>
            <li>
              <NavLink to='fetchold'>Fetch Old </NavLink>
            </li>
            <li>
              <NavLink to='fetchnew'>Fetch New</NavLink>
            </li>
            <li>
              <NavLink to='setting'>Setting</NavLink>
            </li>
           
          </ul>
        </div>
      </div>
    </header>
  )
}
