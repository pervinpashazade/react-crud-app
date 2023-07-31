import React from 'react'
import Header from './components/Layout/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import { ToastContainer } from 'react-toastify';

import "./assets/style/main.css"
import "bootstrap/dist/css/bootstrap.min.css"
import 'sweetalert2/src/sweetalert2.scss'
import 'react-toastify/dist/ReactToastify.css';
import UserItem from './components/Pages/User/UserItem';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<UserItem />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App