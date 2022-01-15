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
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <h1 style={{ "color": "#b36200" }}> puzzles + artwork/design </h1>
            <h2 style={{ "color": "#b36200" }}>James Park, David Zheng</h2>
            <h1 style={{ "color": "#b36200" }}> website </h1>
            <h2 style={{ "color": "#b36200" }}>Rachel Lin</h2>
          </Grid>
        </Grid>
      </>
    )
  }
}
