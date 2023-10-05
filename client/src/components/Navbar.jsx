import { useState, useEffect } from 'react'
import '../styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaHome, FaUsers } from 'react-icons/fa'
import { MdWorkspaces, MdAccountCircle } from 'react-icons/md'
import { SiGoogledocs, SiGoogleanalytics } from 'react-icons/si'
import { GiFactory, GiHamburgerMenu } from 'react-icons/gi'
import { IoLogOut } from 'react-icons/io5'

const Navbar = () => {
  const server = `http://localhost:5050`
  const navig = useNavigate()
  const [mode, setMode] = useState('Online')
  const [acSess, setAcSess] = useState('')
  const [accShrt, setAccShrt] = useState('')
  let acchar=''

  axios.defaults.withCredentials = true

  const getAccSess = async () => {
    try {
      const res = await axios.get(`${server}/accsess`)
      const data = await res.data
      setMode('Online')
      // console.log(data)
      if (data.statuscode===200) {
        console.log(data.message)
        setAcSess(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        acchar = (data.user.acc_name).split(' ').reduce((result, word) => result+=word.slice(0,1),'')
        setAccShrt(acchar.toString())
      }
      else {
        navig('/')
      }
    } catch (error) {
      setMode('Offline')
      let collection = localStorage.getItem('user')
      // console.log(JSON.parse(collection));
      setAcSess(JSON.parse(collection))
      acchar = (JSON.parse(collection).acc_name).split(' ').reduce((result, word) => result+=word.slice(0,1),'')
      setAccShrt(acchar.toString())
      console.error(error)
    }
  }

  const pgld = (e) => {
    const activePg = window.location.pathname
    document.querySelectorAll('.nvlnk').forEach(lnk => {
      if (lnk.href.includes(`${activePg}`)) {
        // console.log(lnk.href)
        lnk.classList.remove('lnk')
        lnk.classList.add('active')
      }
      else {
        lnk.classList.remove('active')
        lnk.classList.add('lnk')
      }
    })
    // console.log(navLnks)
  }

  useEffect(() => {
    getAccSess()
    pgld()
  }, [])

  const toglAcc = () => {
    document.querySelector('.profl').classList.toggle('visbl')
  }

  const hndlsess = async () => {
    try {
      const res = await axios.delete(`${server}/logout`)
      const data = await res.data
      console.log(data)
      setMode('Online')
      if (data.statuscode===200) {
        console.log(data.message)
        window.location.reload()
      }
      else {
        window.alert(`Logout Error !!`)
        console.log(data.error);
      }
    } catch (error) {
      setMode('Offline')
      console.error(error)
    }
  }

  return (
    <>
        <div className='navbar'>
          <div className="navmenu">
            <div className="nav">
              <NavLink to='/home' className='lnk nvlnk'>
                <span className='navicn'>{<FaHome/>}</span>
                <span className='navtxt'>Home</span>
              </NavLink>
            </div>
            <div className="nav">
              <NavLink to='/users' className='lnk nvlnk'>
                <span className='navicn'>{<FaUsers/>}</span>
                <span className='navtxt'>Users</span>
              </NavLink>
            </div>
            <div className="nav">
              <NavLink to='/workarounds' className='lnk nvlnk'>
                <span className='navicn'>{<MdWorkspaces/>}</span>
                <span className='navtxt'>Workarounds</span>
              </NavLink>
              <div className="drp">
                <NavLink to='/workcenter' className='lnk nvlnk'>Work Center</NavLink>
                <NavLink to='/schedules' className='lnk nvlnk'>Schedules</NavLink>
                <NavLink to='/taghistory' className='lnk nvlnk'>Tag History</NavLink>
              </div>
            </div>
            <div className="nav">
              <NavLink to='/factory' className='lnk nvlnk'>
                <span className='navicn'>{<GiFactory/>}</span>
                <span className='navtxt'>Factory</span>
              </NavLink>
              <div className="drp">
                <NavLink to='/production' className='lnk nvlnk'>Production</NavLink>
                <NavLink to='/lightup' className='lnk nvlnk'>Light Up</NavLink>
              </div>
            </div>
            <div className="nav">
              <NavLink to='/officials' className='lnk nvlnk'>
                <span className='navicn'>{<SiGoogledocs/>}</span>
                <span className='navtxt'>Officials</span>
              </NavLink>
              <div className="drp">
                <NavLink to='/documents' className='lnk nvlnk'>Documents</NavLink>
                <NavLink to='/review' className='lnk nvlnk'>Review</NavLink>
              </div>
            </div>
            <div className="nav">
              <NavLink to='/analytics' className='lnk nvlnk'>
                <span className='navicn'>{<SiGoogleanalytics/>}</span>
                <span className='navtxt'>Analytics</span>
              </NavLink>
            </div>
          </div>
          <div className="hmbmenu">
            <NavLink to className='lnk'>{<GiHamburgerMenu/>}</NavLink>
          </div>
          <div className="navacc">
            <div className='accinf'>
              <button className='lnk acclnk' onClick={toglAcc}>
                {
                  (accShrt) ? accShrt : null
                }
              </button>
            </div>
            <div className='profl'>
              <div className='cnfmsg'>
                <div>
                {
                  (acSess) ? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'1rem'}}>
                      <span style={{color:'var(--theme-dark)', fontWeight:'bold'}}>WELCOME</span>
                      <span style={{color:'#ff9146', fontSize:'0.8rem'}}>{acSess.acc_name}</span>
                    </div>
                  ) : null
                }
                </div>
                {/* <div>Do You Want to Log Out Now ?</div> */}
              </div>
              <div className="cnfrmbtn">
                <div className="nav">
                  <NavLink to='/profile' className='lnk nvlnk'>
                    <span className='navicn'>{<MdAccountCircle/>}</span>
                    <span className='navtxt'>Account</span>
                  </NavLink>
                </div>
                <div className="nav">
                  <button onClick={hndlsess} className='lnk'>
                    <span className='navicn'>{<IoLogOut/>}</span>
                    <span className='navtxt'>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar