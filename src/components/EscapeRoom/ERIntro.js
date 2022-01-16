import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  CssBaseline,
  Grid,
  Button,
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
            <h2 style={{ "color": "#b36200" }}>
              After a long day of competition at the Southern California Science Olympiad Headquarters,
              you accidentally fall asleep and wake up hours later to find that everyone else has left!
              Unfortunately for you, the security in the building is state-of-the-art. The cell reception
              isn’t very good, either, so you aren’t able to call anyone. It’s up to you to solve the puzzles
              scattered around the rooms and figure out how to escape in time to attend the awards ceremony.
              <br></br>
              <br></br>

                The timer starts from the earliest time anyone on your team clicks "start" and ends when anyone on your team escapes!
          </h2>

            <Link to="/er/main" onClick={this.props.start}><Button><h1 style={{ color: "#b36200" }}>Start</h1></Button></Link>
          </Grid>

        </Grid>
      </>
    )
  }
}
