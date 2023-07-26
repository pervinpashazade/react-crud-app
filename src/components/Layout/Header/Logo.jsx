import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.svg'

function Logo() {
    return (
        <Link to="/">
            <img src={logo} alt="logo"/>
        </Link>
    )
}

export default Logo