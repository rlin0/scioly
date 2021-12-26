import React, { Component } from "react"
import axios from "axios"
import { S3Url } from "../helpers.js"
import "./Login.css"
import { Link } from "react-router-dom"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            numMembers: 1,
            taken: false,
            success: false,
            users: [],
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.name.length === 0) {
            this.setState({ taken: false })
            return
        }
        // window.location.href = '/'
        axios
            .post("/api/register/", {
                name: this.state.name,
                n: this.state.numMembers
            })
            .then((res) => {
                if (res.data.success) {
                    if (res.data.taken) {
                        this.setState({ incorrect: true })
                    } else {
                        this.setState({ success: true, users: res.data.users })
                    }
                } else console.error(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render() {
        return (
            <div className="login-terminal">
                <div className="login">
                    {this.state.success ?
                        <div className="login-form">
                            <h2>{this.state.numMembers} accounts created for Team {this.state.name}:</h2>
                            <h3>username, password</h3>
                            {this.state.users.map((u) => {
                                return <p>{u[0]}, {u[1]}</p>
                            })}
                            <Link to='/'>
                                <button className="login-button">BACK TO LOGIN</button>
                            </Link>
                        </div> :
                        <form onSubmit={this.handleSubmit} className="login-form">
                            <label htmlFor="name" className="login-label">
                                TEAM NAME{" "}
                            </label>
                            <input
                                required
                                type="text"
                                value={this.state.name}
                                id="name"
                                className="login-input"
                                onChange={({ target }) =>
                                    this.setState({ name: target.value })
                                }
                            />

                            <div>
                                <label htmlFor="numMembers" className="login-label">
                                    NUMBER OF PEOPLE{" "}
                                </label>
                                <select
                                    required
                                    value={this.state.numMembers}
                                    id="numMembers"
                                    className="login-input"
                                    onChange={({ target }) =>
                                        this.setState({ numMembers: target.value })
                                    }
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                            <div className="incorrect">
                                {this.state.takem && <p>Team name is already taken.</p>}
                            </div>
                            <button type="submit" className="login-button">
                                CREATE ACCOUNTS
            </button>
                            <Link to='/'><button className="login-button">
                                BACK
            </button></Link>
                        </form>}


                </div>

                <div className="login-scanline" />
            </div>
        )
    }
}
