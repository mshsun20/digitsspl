import React from 'react'
import '../styles/account.css'
import Header from './Header'
import Footer from './Footer'

const Account = () => {
  return (
    <>
        <div className="wbvw">
          <div className='wrapper'></div>

          <Header/>

          <div className="container">
            <div className="accnt">
              <div className="acchdr">&bull;&nbsp;<span>Account Details &gt;&gt;</span></div>
              <div className="accbdy">
                <div className="accicn">
                  <span>MSSH</span>
                  <div className='accdta'>
                    <div className="accnm">Mriganka Sekhar Halder</div>
                    <div className="accindstry">Shyam Sel & Power Ltd. Kolkata - HO</div>
                    <div className="accempcd">2203190</div>
                  </div>
                </div>
                <div className="accinf">
                  <div className="infhd">Account Info</div>
                  <div className="accdtl">
                    <form className='accfrm'>
                      <div className="frmgrp">
                        <label htmlFor="">Account Name : </label>
                        <input type="text" name="" id="" disabled='true' />
                      </div>
                      <div className="frmgrp">
                        <label htmlFor="">Phone Number : </label>
                        <input type="text" name="" id="" disabled='true' />
                      </div>
                      <div className="frmgrp">
                        <label htmlFor="">Email Id : </label>
                        <input type="text" name="" id="" disabled='true' />
                      </div>
                      <div className="frmgrp">
                        <label htmlFor="">Account Password : </label>
                        <input type="password" name="" id="" disabled='true' />
                      </div>
                      <div className="frmgrp">
                        <input type="submit" value="Edit" name="" id="" />
                        <input type="submit" value="Save" name="" id="" disabled />
                      </div>
                    </form>
                  </div>
                  <div className="accprfl"></div>
                </div>
              </div>
            </div>
          </div>

          <Footer/>
        </div>
    </>
  )
}

export default Account