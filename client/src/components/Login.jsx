import { useState, useEffect } from 'react'
import '../styles/Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logbg from '../images/digitlgbg4.jpg'


const Login = () => {
  const server = `http://localhost:5050`
  const navig = useNavigate()
  const [dta, setDta] = useState({})
  let name, value

  axios.defaults.withCredentials = true

  const getAccSess = async () => {
    try {
      const res = await axios.get(`${server}/accsess`)
      const data = await res.data
      console.log(data)
      if (data.statuscode===200) {
        console.log(data.message)
        localStorage.setItem('user', JSON.stringify(data.user))
        navig('/home')
      }
      else {
        console.log(data.message)
      }
    } catch (error) {
      // let collection = localStorage.getItem('user')
      console.error(error)
    }
  }

  useEffect(() => {
    getAccSess()
  }, [])

  const hndlChng = (e) => {
    name=e.target.name
    value=e.target.value
    setDta({...dta, [name]: [value]})
  }

  const hndlSub = async (e) => {
    e.preventDefault()
    const {acc_email, acc_pass} = dta
    if (acc_pass.length>0) {
      try {
        const res = await axios.post(`${server}/login`, {acc_email, acc_pass})
        const data = await res.data
        // console.log(data)
        if (data.statuscode===200) {
          localStorage.setItem('user', JSON.stringify(data.user))
          window.alert(data.success)
          navig('/home')
        }
        else if (data.statuscode===401) {
          window.alert(data.error)
        }
        else if (data.statuscode===402) {
          window.alert(data.error)
        }
        else {
          console.log(`Server or DB Error Occured !!!`);
        }
      } catch (error) {
        // let collection = localStorage.getItem('user')
        console.error(error)
      }
    }
    else {
      window.alert(`Phone Number is Mandatory.`)
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
          <div className='logpg'>
            <img src={logbg} alt="" />
            <div className="lgoverlay"></div>
            
            <div className='logcontainer'>
              <div className="contlayr"></div>
              <div className="lgsec">
                <div className="loghd">Login</div>
                <div className="logfrm">
                  <form className='lgfrm'>
                    <div className='frmgrp'>
                      <label htmlFor="acc_email" id='acceml'>Email Id : </label>
                      <input type="text" name="acc_email" id="acc_email" autoComplete='off' onChange={hndlChng} onFocus={upeml} onBlur={dwneml} />
                    </div>
                    <div className='frmgrp'>
                      <label htmlFor="acc_pass" id='accpss'>Password : </label>
                      <input type="password" name="acc_pass" id="acc_pass" autoComplete='off' onChange={hndlChng} onFocus={uppss} onBlur={dwnpss} />
                    </div>
                    <div className='frmgrp'>
                      <input type="submit" value="Sign In" onClick={hndlSub} />
                    </div>
                  </form>
                </div>
                <div className="reglnk">
                  <span>Create Account |&nbsp;</span>
                  <NavLink to='/reg' className='lnk'>Click Here</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login