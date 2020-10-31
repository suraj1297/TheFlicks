import React, { Component } from 'react'
import './Navbar.css';
import SignInUp from './SignInUp';
import User from './User';
import { Link } from "react-router-dom"

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            shouldDisplay: true
        }
    }

    render() {

        let display = true
        if (this.props.media === "trending" || window.location.href.includes("details"))
            display = false

        return (
            <div className="navbar">
                <h1><Link to="/">TheFlicks</Link></h1>
                <div>
                    {
                        display && (
                            <select name="language" id="language" value={this.props.language} onChange={this.props.changeLanguage}>
                                <option value="en" id="option">English</option>
                                <option value="hi">Hindi</option>
                                <option value="es">Spanish</option>
                            </select>
                        )
                    }
                    {this.props.isloggedIn ?
                        <User userName={this.props.userName} logOut={this.props.logOut} />
                        : <SignInUp askSignInUp={this.props.askSignInUp} />}
                </div>

            </div>
        )
    }
}
