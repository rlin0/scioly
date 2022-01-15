import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import text from "../../text/act3Scripts"
import {
  CssBaseline,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core"

export default class ERIntro extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <CssBaseline />

        <Grid container justify="center">
          <Grid item xs={6}>
            <h2 style={{ "color": "#b36200" }}>After a long day of competition at the Southern California Science Olympiad Headquarters,
            you accidentally fall asleep and wake up hours later to find that everyone else has left!
            Unfortunately for you, the security in the building is state-of-the-art. The cell reception
            isn’t very good, either, so you aren’t able to call anyone. It’s up to you to solve the puzzles
            scattered around the rooms and figure out how to escape in time to attend the awards ceremony.
          </h2>
            <Button>
              <Link to="/er/main" onClick={this.props.start}>Start</Link>
            </Button>
          </Grid>

        </Grid>
      </>
    )
  }
}
