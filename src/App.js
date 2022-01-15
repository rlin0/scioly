import React, { Component } from "react"
import axios from "axios"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Header from "./components/UI/Header"
import Login from "./components/Login"
import Main from "./components/EscapeRoom/Main"
import Mechanics from "./components/EscapeRoom/Mechanics"
import MechanicsCloset from "./components/EscapeRoom/MechanicsCloset"
import ER from "./components/EscapeRoom/Base"
import ERIntro from "./components/EscapeRoom/ERIntro"
import Lockers from "./components/EscapeRoom/Lockers"
import Library from "./components/EscapeRoom/Library"
import Spy from "./components/EscapeRoom/Spy"
import Hallway1 from "./components/EscapeRoom/Hallway1"
import Hallway2 from "./components/EscapeRoom/Hallway2"
import Maintenance from "./components/EscapeRoom/Maintenance"
import ElectricalBox from "./components/EscapeRoom/ElectricalBox"
import Merchant from "./components/EscapeRoom/Merchant"
import { ThemeProvider } from "@material-ui/core/styles"
import AVERYCORP_THEME from "./components/Theme"
import { setBit } from "./helpers.js"
import "./App.css"
import { CssBaseline } from "@material-ui/core"
import Credits from "./components/Credits"
import Leaderboard from "./components/Leaderboard"
import Register from "./components/Register"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      teamId: localStorage.getItem("teamId"),
      teamName: localStorage.getItem("teamName"),
      started: localStorage.getItem("started"),
      start_ts: null,
      end_ts: null,
    }
  }

  getTimes = () => {
    if (this.state.teamId !== null) {
      axios
        .get(`/api/team/${this.state.teamId}/`)
        .then((res) => {
          this.setState({
            start_ts: res.data.start_ts,
            end_ts: res.data.end_ts,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  componentDidMount() {
    this.getTimes()
  }
  // componentDidUpdate() {
  //   this.getTimes()
  // }

  login = (username, userId, teamId, teamName, started) => {
    this.setState({
      username: username,
      userId: userId,
      teamId: teamId,
      teamName: teamName,
      started: started,
    })
    // store the user in localStorage
    localStorage.setItem("username", this.state.username)
    localStorage.setItem("userId", this.state.userId)
    localStorage.setItem("teamId", this.state.teamId)
    localStorage.setItem("teamName", this.state.teamName)
    localStorage.setItem("started", this.state.started)
  }

  logout = () => {
    this.setState({
      username: null,
      userId: null,
      teamId: null,
      teamName: null,
      started: false,
      start_ts: null,
      end_ts: null,
    })
    localStorage.clear()
  }

  updateAct = (id) => {
    const updated = setBit(this.state.act, id)
    axios
      .patch(`/api/team/${this.state.teamId}/`, {
        act: updated,
      })
      .then((res) => {
        this.setState({ act: updated })
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  start = () => {
    axios
      .post(`/api/er/start`, {
        teamId: this.state.teamId,
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({ started: true, start_ts: res.data.start_ts })
          localStorage.setItem("started", true)
        }
        else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  end = (ts) => {
    this.setState({ end_ts: ts })
  }

  render() {
    return (
      <ThemeProvider theme={AVERYCORP_THEME}>
        <CssBaseline />

        {this.state.userId === null ? (
          <>

            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <Login login={this.login} />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
              </Switch>
              <Redirect to="/" />
            </BrowserRouter>

          </>
        ) : (
          <>
            <CssBaseline />
            <BrowserRouter>
              <div className="terminal">
                <div className="app">
                  <Header
                    username={this.state.username}
                    team={this.state.teamName}
                    logout={this.logout}
                    start_ts={this.state.start_ts}
                    end_ts={this.state.end_ts}
                  />
                  <Switch>
                    <Route exact path="/credits">
                      <Credits />
                    </Route>

                    <Route exact path="/instructions">
                      <ERIntro />
                    </Route>

                    <Route exact path="/leaderboard">
                      <Leaderboard />
                    </Route>

                    <Route exact path="/er/main">
                      <ER
                        comp={Main}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                        start={this.start}
                        end={this.end}
                      />
                    </Route>
                    <Route exact path="/er/mechanics">
                      <ER
                        comp={Mechanics}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>
                    <Route exact path="/er/mechanics_closet">
                      <ER
                        comp={MechanicsCloset}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>
                    <Route exact path="/er/lockers">
                      <ER
                        comp={Lockers}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>
                    <Route exact path="/er/library">
                      <ER
                        comp={Library}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>

                    <Route exact path="/er/spy">
                      <ER
                        comp={Spy}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>

                    <Route exact path="/er/hallway1">
                      <ER
                        comp={Hallway1}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>
                    <Route exact path="/er/hallway2">
                      <ER
                        comp={Hallway2}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>

                    <Route exact path="/er/maintenance">
                      <ER
                        comp={Maintenance}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>

                    <Route exact path="/er/electrical">
                      <ER
                        comp={ElectricalBox}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>

                    <Route exact path="/er/merchant">
                      <ER
                        comp={Merchant}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                        started={this.state.started}
                      />
                    </Route>
                    <Redirect exact from="/" to="/er/main" />
                  </Switch>
                </div>
                <div className="scanline"></div>
              </div>
            </BrowserRouter>
          </>
        )}
      </ThemeProvider>
    )
  }
}
