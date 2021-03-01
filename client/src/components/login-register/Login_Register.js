import React, { Component } from 'react'
import './Login-register.css'
import Axios from 'axios'

class Login_Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.changeHandlerUsername = this.changeHandlerUsername.bind(this)
        this.changeHandlerPassword = this.changeHandlerPassword.bind(this)
    };

    isAuthenticated() {
        Axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                "x-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response)
        })
    }

    directToLogin = () => {
        Axios.post("http://localhost:3001/login", {
            username: this.state.username,
            password: this.state.password,
        }).then((response) => {
            if (!response.data.auth) {
                console.log(response)
                this.isAuthenticated();
            }
            else {
                console.log("Authenticated!")
                localStorage.setItem("token", response.data.token)
                this.isAuthenticated();
            }
        });
    }

    changeHandlerUsername(e) {
        this.setState({
            username: e.target.value
        })
    };

    changeHandlerPassword(e) {
        this.setState({
            password: e.target.value
        })
    };

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="title-text">
                        <div className="title login">
                            Login Page
                        </div>
                    </div>
                    <div className="form-container">

                        <div className="form-inner">
                            <div className="login">
                                <div className="field">
                                    <input type="text" placeholder="Username" required onChange={this.changeHandlerUsername} />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" required onChange={this.changeHandlerPassword} />
                                </div>

                                <div className="field btn">
                                    <div className="btn-layer">
                                    </div>
                                    <input type="submit" value="Login" onClick={this.directToLogin} />
                                </div>
                            </div>
                            <form action="#" className="register">
                                <div className="field" />
                                <div className="field" />
                                <div className="field" />
                                <div className="field" />
                                <div className="field">

                                </div>
                                <div className="field">

                                </div>
                                <div className="field btn">
                                    <div className="btn-layer">
                                    </div>
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Login_Register
