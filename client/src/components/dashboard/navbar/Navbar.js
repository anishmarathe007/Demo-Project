import "./Navbar.css";

import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (

            <nav className="navbar">
                <div className="navbar__left">

                    <a className="active_link" href="#">Home</a>
                </div>

                <div className="navbar__center">
                    <h1>Employee Leave Uitility</h1>
                </div>

                <div className="navbar__right">
                    <a href="#">Manager</a>
                </div>

            </nav>
        )
    }
}

export default Navbar
