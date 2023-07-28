import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import axios from 'axios'

function Header() {

    const addUser = () => {
        axios.post("http://localhost:3000/users", {
            id: Date.now(),
            fullname: "Rufet Rzayev"
        }).then(res => {
            console.log("new user resp", res);
        })
    }

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
                <Button
                    color='light'
                    style={{
                        color: "#5E72E4",
                        fontSize: "14px"
                    }}
                    onClick={addUser}
                >
                    Add User
                </Button>
            </div>
        </div>
    )
}

export default Header