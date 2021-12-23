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
import Meme from "./components/EscapeRoom/Meme"
import Merchant from "./components/EscapeRoom/Merchant"
import { ThemeProvider } from "@material-ui/core/styles"
import AVERYCORP_THEME from "./components/Theme"
import { setBit } from "./helpers.js"
import "./App.css"
import { CssBaseline } from "@material-ui/core"
import Credits from "./components/Credits"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      act: 0,
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      teamId: localStorage.getItem("teamId"),
      teamName: localStorage.getItem("teamName"),
      role: localStorage.getItem("role"),

      intro0Played: false,
      intro2Played: false,
    }
  }

  componentDidMount() {
    if (this.state.teamId !== null) {
      axios
        .get(`/api/team/${this.state.teamId}/`)
        .then((res) => {
          this.setState({ act: parseInt(res.data.act) })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  login = (username, userId, teamId, teamName, role) => {
    this.setState({
      username: username,
      userId: userId,
      teamId: teamId,
      teamName: teamName,
      role: role,
    })
    // store the user in localStorage
    localStorage.setItem("username", this.state.username)
    localStorage.setItem("userId", this.state.userId)
    localStorage.setItem("teamId", this.state.teamId)
    localStorage.setItem("teamName", this.state.teamName)
    localStorage.setItem("role", this.state.role)
  }

  logout = () => {
    this.setState({
      username: null,
      userId: null,
      teamId: null,
      teamName: null,
      act: 0,
      role: null,
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
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  setIntroPlayed = (id) => {
    this.setState({
      [id]: true,
    })
  }

  render() {
    return (
      <ThemeProvider theme={AVERYCORP_THEME}>
        <CssBaseline />

        {this.state.userId === null ? (
          <Login login={this.login} />
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
                  />
                  <Switch>
                    <Route exact path="/credits">
                      <Credits />
                    </Route>

                    <Route exact path="/er">
                      <ERIntro />
                    </Route>
                    <Route exact path="/er/main">
                      <ER
                        comp={Main}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/mechanics">
                      <ER
                        comp={Mechanics}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/mechanics_closet">
                      <ER
                        comp={MechanicsCloset}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/lockers">
                      <ER
                        comp={Lockers}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/library">
                      <ER
                        comp={Library}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>

                    <Route exact path="/er/spy">
                      <ER
                        comp={Spy}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>

                    <Route exact path="/er/hallway1">
                      <ER
                        comp={Hallway1}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/hallway2">
                      <ER
                        comp={Hallway2}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>

                    <Route exact path="/er/maintenance">
                      <ER
                        comp={Maintenance}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/meme">
                      <ER
                        comp={Meme}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Route exact path="/er/electrical">
                      <ER
                        comp={ElectricalBox}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>

                    <Route exact path="/er/merchant">
                      <ER
                        comp={Merchant}
                        userId={this.state.userId}
                        teamId={this.state.teamId}
                      />
                    </Route>
                    <Redirect from="*" to="/er" />
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
