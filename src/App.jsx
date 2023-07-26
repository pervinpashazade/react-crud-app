import React from 'react'
import Header from './components/Layout/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home/Home'

import "./assets/style/main.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App