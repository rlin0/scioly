import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import DialogueBox from "../UI/DialogueBox"
import text from "../../text/act3Scripts"

export default class ERIntro extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <h1>instructions here</h1>
        <Link to="/er/main" onClick={this.props.start}>Start</Link>
      </>
    )
  }
}
