import React, { Component } from "react"
import axios from "axios"
import { S3Url } from "../helpers.js"
import "./Login.css"
import { Link } from "react-router-dom"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      incorrect: false,
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    axios
      .get("/api/login/", {
        params: {
          username: this.state.username,
          password: this.state.password,
        },
      })
      .then((res) => {
        if (res.data.success) {
          if (res.data.loggedIn)
            this.props.login(
              res.data.user.username,
              res.data.user.id,
              res.data.user.teamId,
              res.data.user.teamName,
            )
          else this.setState({ incorrect: true })
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
          <form onSubmit={this.handleSubmit} className="login-form">
            <img src={S3Url + "/logo2_fill_w.svg"} alt="logo" id="login-logo" />
            <label htmlFor="username" className="login-label">
              LOGIN ID{" "}
            </label>
            <input
              required
              type="text"
              value={this.state.username}
              id="username"
              className="login-input"
              onChange={({ target }) =>
                this.setState({ username: target.value })
              }
            />
            <div>
              <label htmlFor="password" className="login-label">
                PASSWORD{" "}
              </label>
              <input
                required
                type="password"
                value={this.state.password}
                id="password"
                className="login-input"
                onChange={({ target }) =>
                  this.setState({ password: target.value })
                }
              />
            </div>
            <div className="incorrect">
              {this.state.incorrect && <p>Incorrect login.</p>}
            </div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
            <Link to='/register'><button className="login-button">
              REGISTER YOUR TEAM
            </button></Link>
          </form>
        </div>
        <div className="login-scanline" />
      </div>
    )
  }
}
