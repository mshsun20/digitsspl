import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Users from './components/Users'
import Workarounds from './components/Workarounds'
import Workcenter from './components/workaround/Workcenter'
import Schedules from './components/workaround/Schedules'
import Taghistory from './components/workaround/Taghistory'
import Factory from './components/Factory'
import Production from './components/factory/Production'
import Lightup from './components/factory/Lightup'
import Officials from './components/Officials'
import Documents from './components/officials/Documents'
import Review from './components/officials/Review'
import Analytics from './components/Analytics'
import Account from './components/Account'

const Router = () => {
  return (
    <>
        <div className='wbpg'>
            <Topbar />
            <div className='wbbdy'>
              <Routes>
                  <Route path='/' element={<Login />}></Route>
                  <Route path='/reg' element={<Registration />}></Route>
                  <Route path='/home' element={<Home />}></Route>
                  <Route path='/users' element={<Users />}></Route>
                  <Route path='/about' element={<About />}></Route>
                  <Route path='/contact' element={<Contact />}></Route>
                  <Route path='/workarounds' element={<Workarounds/>}></Route>
                  <Route path='/workcenter' element={<Workcenter/>}></Route>
                  <Route path='/schedules' element={<Schedules/>}></Route>
                  <Route path='/taghistory' element={<Taghistory/>}></Route>
                  <Route path='/factory' element={<Factory/>}></Route>
                  <Route path='/production' element={<Production/>}></Route>
                  <Route path='/lightup' element={<Lightup/>}></Route>
                  <Route path='/officials' element={<Officials/>}></Route>
                  <Route path='/documents' element={<Documents/>}></Route>
                  <Route path='/review' element={<Review/>}></Route>
                  <Route path='/analytics' element={<Analytics/>}></Route>
                  <Route path='/profile' element={<Account/>}></Route>
              </Routes>
            </div>
        </div>
    </>
  )
}

export default Router