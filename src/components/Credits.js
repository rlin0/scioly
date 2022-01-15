import React, { Component } from "react"
import { Button, Typography, TextField } from "@material-ui/core"
import axios from "axios"
import { Link } from "react-router-dom"
import { S3Url } from "../helpers"
import Grid from "@material-ui/core/Grid"

export default class Credits extends Component {
  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h2> puzzles + artwork/design </h2>
            <p>James Park, David Zheng</p>
            <h2> website </h2>
            <p>Rachel Lin</p>
          </Grid>
        </Grid>
      </>
    )
  }
}
