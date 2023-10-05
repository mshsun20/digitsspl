import { useState } from 'react'
import '../styles/Registration.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import regbg from '../images/digtrgbg1.jpg'


const Registration = (props) => {
  const server = `http://localhost:5050`
  const navig = useNavigate()
  const [dta, setDta] = useState({})
  let name, value

  const hndlChng = (e) => {
    name=e.target.name
    value=e.target.value
    setDta({...dta, [name]:[value]})
  }

  const hndlSub = async (e) => {
    e.preventDefault()
    const {acc_phone, acc_name, acc_email, acc_pass} = dta
    if (!acc_phone) {
      window.alert(`Phone Number has to be Filled.`)
    }
    else if (acc_phone.length<10) {
      window.alert(`Phone Number must be of 10 digits !!!`)
    }
    else if (acc_phone.length===10) {
      try {
        const res = await axios.post(`${server}/crtacc`, {acc_phone, acc_name, acc_email, acc_pass})
        const data = await res.data
        // console.log(data.error.sqlMessage)
        if (data.statuscode===200) {
          window.alert(data.success)
          navig('/')
        }
        else {
          window.alert(`Phone Number Already Exists !!!`)
        }
      } catch (error) {
        console.error(error)
      }
    }
    else {
      window.alert(`Phone Number has to be Filled.`)
    }
  }

  const upphn = (e) => {
    document.querySelector('#accphn').style.top = '0%'
    document.querySelector('#accphn').style.fontSize = '1.3rem'
  }
  const dwnphn = (e) => {
    if (!e.target.value) {
      document.querySelector('#accphn').style.top = '50%'
      document.querySelector('#accphn').style.fontSize = '1rem'
    }
  }
  const upnm = (e) => {
    document.querySelector('#accnm').style.top = '0%'
    document.querySelector('#accnm').style.fontSize = '1.3rem'
  }
  const dwnnm = (e) => {
    if (!e.target.value) {
      document.querySelector('#accnm').style.top = '50%'
      document.querySelector('#accnm').style.fontSize = '1rem'
    }
  }
  const upeml = (e) => {
    document.querySelector('#acceml').style.top = '0%'
    document.querySelector('#acceml').style.fontSize = '1.3rem'
  }
  const dwneml = (e) => {
    if (!e.target.value) {
      document.querySelector('#acceml').style.top = '50%'
      document.querySelector('#acceml').style.fontSize = '1rem'
    }
  }
  const uppss = (e) => {
    document.querySelector('#accpss').style.top = '0%'
    document.querySelector('#accpss').style.fontSize = '1.3rem'
  }
  const dwnpss = (e) => {
    if (!e.target.value) {
      document.querySelector('#accpss').style.top = '50%'
      document.querySelector('#accpss').style.fontSize = '1rem'
    }
  }

  return (
    <>
        <div className="wbvw">
          <div className="regpg">
            <img src={regbg} alt="" />
            <div className="rgoverlay"></div>

            <div className="regcontainer">
              <div className="contlayr"></div>
              <div className="rgsec">
                <div className="reghd">Registration</div>
                <div className="regfrm">
                  <form className='rgfrm'>
                    <div className='frmgrp'>
                      <label htmlFor="acc_phone" id='accphn'>Phone Number : </label>
                      <input type="text" name="acc_phone" id="acc_phone" autoComplete='off' onChange={hndlChng} onFocus={upphn} onBlur={dwnphn} />
                    </div>
                    <div className='frmgrp'>
                      <label htmlFor="acc_name" id='accnm'>Full Name : </label>
                      <input type="text" name="acc_name" id="acc_name" autoComplete='off' onChange={hndlChng} onFocus={upnm} onBlur={dwnnm} />
                    </div>
                    <div className='frmgrp'>
                      <label htmlFor="acc_email" id='acceml'>Email Id : </label>
                      <input type="text" name="acc_email" id="acc_email" autoComplete='off' onChange={hndlChng} onFocus={upeml} onBlur={dwneml} />
                    </div>
                    <div className='frmgrp'>
                      <label htmlFor="acc_pass" id='accpss'>Password : </label>
                      <input type="password" name="acc_pass" id="acc_pass" autoComplete='off' onChange={hndlChng} onFocus={uppss} onBlur={dwnpss} />
                    </div>
                    <div className='frmgrp'>
                      <input type="submit" value="Sign Up" onClick={hndlSub} />
                    </div>
                  </form>
                </div>
                <div className="loglnk">
                  Already Registered |&nbsp;<NavLink to='/' className='lnk'>Click Here</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Registration