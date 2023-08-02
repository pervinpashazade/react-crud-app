import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import axios from 'axios'

function Header() {

    return (
        <div className='container'>
            <div className="header-wrapper d-flex justify-content-between align-items-center">
                <div>
                    <Logo />
                    <Link
                        to="/posts"
                        style={{
                            marginLeft: "50px",
                            color: "#fff"
                        }}
                        className='btn'
                    >
                        Posts
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header