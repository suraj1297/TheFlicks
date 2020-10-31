import React, { Component } from 'react'
import "./Sign.css"

export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            showMessage: false,
            exists: false,
            blankMessage: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    register = () => {

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
            const user = localStorage.getItem(this.state.username)
            if (user) {
                this.setState({ exists: true, blankMessage: "" })
            }
            else {
                localStorage.setItem(this.state.username,
                    JSON.stringify({ password: this.state.password, wishlist: [] }))

                localStorage.setItem("loggedIn", JSON.stringify({ isLoggedIn: true, username: this.state.username }))
                this.setState({ showMessage: true, exists: false, blankMessage: "" })
                let id = setTimeout(() => {
                    this.props.askSignInUp("signup", this.state.username)
                    clearTimeout(id)
                }, 2000)
            }
        }
    }

    render() {
        return (
            <div className="sign">
                {this.state.showMessage && <div className="register">Registered Successfully!</div>}
                {this.state.exists && <div className="exists">Username already exists! Please try some different name.</div>}
                {this.state.blankMessage && <div className="exists">{this.state.blankMessage}</div>}
                <div className="form">
                    <p>Sign Up</p>

                    <p>UserName</p>
                    <input type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />

                    <p>Password</p>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <div onClick={this.register}>signup</div>
                </div>
            </div>
        )
    }
}
