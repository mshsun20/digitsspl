import { useState, useEffect } from 'react'
import axios from 'axios'

const Topbar = () => {
  const server = `http://localhost:5050`
  const [mode, setMode] = useState('Online')

  const chckMode = async () => {
    try {
      const res = await axios.get(`${server}/check`)
      const data = await res.data
      // console.log(data);
      if (data) {
        setMode('Online')
      }
      else {
        setMode('Offline')
      }
    } catch (error) {
      setMode('Offline')
      console.error(error)
    }
  }

  const setOn = () => {
    if (document.querySelector('.wbmode')) {
      const ondiv = document.createElement('div')
      ondiv.classList.add('onln')
      ondiv.innerHTML = `Back to Online...`
      document.querySelector('.wbmode').appendChild(ondiv)
      setTimeout(() => {
        document.querySelector('.wbmode').removeChild(ondiv)
      }, 2000)
    }
    else {
      return null
    }
  }
  useEffect(() => {
    chckMode()
  }, [])
  setInterval(() => {
    chckMode()
  }, 10000);

  return (
    <>
        <div className='topbar'>
          <div className="wbmode">
            {
              (mode==='Offline') ? <div className='offln'>Offline Mode</div> : setOn()
            }
          </div>
          <div className='topper'>
            <span style={{fontWeight:'bold'}}>Contact Us @ :</span>&nbsp;&nbsp;<span style={{fontStyle:'italic'}}>1800 202 2233</span>
          </div>
        </div>
    </>
  )
}

export default Topbar