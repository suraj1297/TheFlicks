import React, { Component } from 'react'
import "./Sign.css"

export default class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            message: false,
            loginMessage: false,
            blankMessage: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    verify = () => {

        if (!this.state.password && !this.state.username) {
            this.setState({ blankMessage: "Username & Password fields cannot be empty!" })
        }
        else if (!this.state.password) {
            this.setState({ blankMessage: "Password field cannot be empty!" })
        }
        else if (!this.state.username) {
            this.setState({ blankMessage: "Username field cannot be empty!" })
        }
        else {
            const userData = JSON.parse(localStorage.getItem(this.state.username))
            if (userData && userData.password === this.state.password) {
                localStorage.setItem("loggedIn", JSON.stringify({ isLoggedIn: true, username: this.state.username }))
                this.setState({ message: false, loginMessage: true, blankMessage: "" })
                let id = setTimeout(() => {
                    this.props.askSignInUp("signin", this.state.username, userData.wishlist)
                    clearTimeout(id)
                }, 2000)
            } else {
                this.setState({ message: true })
            }
        }

    }

    render() {
        return (
            <div className="sign">
                {this.state.loginMessage && <div className="register">Logged In Successfully!</div>}
                {this.state.blankMessage && <div className="exists">{this.state.blankMessage}</div>}
                <div className="form">
                    <p>Sign In</p>

                    <p>UserName</p>
                    <input type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange} />

                    <p>Password</p>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange} />

                    {this.state.message && <p className="message">Username or Password doesn't match!</p>}

                    <p className="create-account"
                        onClick={() => this.props.askSignInUp("signup")}
                    >
                        create account?
                    </p>
                    <div onClick={this.verify}>signin</div>
                </div>
            </div>
        )
    }
}
