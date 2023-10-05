import React from 'react'
import Logopart from './Logopart'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
        <div className='header'>
          <Logopart/>
          <Navbar/>
        </div>
    </>
  )
}

export default Header