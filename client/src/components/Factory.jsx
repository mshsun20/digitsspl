import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Factory = () => {
  return (
    <>
        <div className="wbvw">
          <div className='wrapper'></div>

          <Header/>

          <div className="container">Factory</div>

          <Footer/>
        </div>
    </>
  )
}

export default Factory