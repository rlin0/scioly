import React, { Component } from "react"
import {
  CssBaseline,
  Grid,
} from "@material-ui/core"

export default class Credits extends Component {
  render() {
    return (
      <>
        <CssBaseline />

        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <h1 style={{ "color": "#b36200" }}> PUZZLES + ARTWORK/DESIGN </h1>
            <h2 style={{ "color": "#b36200" }}>James Park, David Zheng</h2>
            <h1 style={{ "color": "#b36200" }}> WEBSITE </h1>
            <h2 style={{ "color": "#b36200" }}>Rachel Lin</h2>
          </Grid>
        </Grid>
      </>
    )
  }
}
