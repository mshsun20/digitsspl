import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

const App = () => {
  // const server = `http://localhost:5050`

  return (
    <>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </>
  )
}

export default App