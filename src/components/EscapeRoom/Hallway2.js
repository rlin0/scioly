import React, { Component } from "react"
import { Link } from "react-router-dom"
import { S3Url, masterPW } from "../../helpers.js"
import LockModal from "../UI/LockModal"
import Window from "../UI/Window"

const mainRoom = {
  left: "97.92%",
  top: "42.88%",
  width: "1.92%",
  height: "35%",
  position: "absolute",
  display: "block",
  zIndex: "5",
  overflow: "hidden",
}

const maintenanceRoom = {
  left: "0%",
  top: "43.88%",
  width: "4.92%",
  height: "36.38%",
  position: "absolute",
  display: "block",
  zIndex: "5",
  overflow: "hidden",
}

const mechanicsRoom = {
  left: "45.58%",
  top: "57.25%",
  width: "2.67%",
  height: "5%",
  position: "absolute",
  display: "block",
  zIndex: "5",
  overflow: "hidden",
}

const window = {
  left: "14.5%",
  top: "50.25%",
  width: "17.75%",
  height: "14.12%",
  position: "absolute",
  display: "block",
  zIndex: "5",
  overflow: "hidden",
}

const memeWindow = {
  left: "52.08%",
  top: "50.25%",
  width: "17.75%",
  height: "14%",
  position: "absolute",
  display: "block",
  zIndex: "5",
  overflow: "hidden",
}

export default class Hallway2 extends Component {
  constructor(props) {
    super(props)
    this.state = { window: false, anchorEl: null }
  }

  handleSubmitMechanics = (code) => {
    if (code === masterPW || code === "Brachistochrone") {
      this.props.putMechanicsUnlocked()
      return true
    } else return false
  }

  lockedMechanics = () => {
    return (
      <LockModal
        style={mechanicsRoom}
        handleSubmit={this.handleSubmitMechanics}
      />
    )
  }
  render() {
    if (this.props.mechanicsUnlocked === null) return null

    return (
      <>
        <img src={S3Url + "/er/Hallway2.png"} width="100%" />
        <Link style={mainRoom} to="/er/main" />
        <Link style={maintenanceRoom} to="/er/maintenance" />

        <Window style={window} link={S3Url + "/er/window_mechanic.png"} />
        <Window style={memeWindow} link={S3Url + "/er/memeroom_window.png"} />

        {this.props.mechanicsUnlocked ? (
          <Link style={mechanicsRoom} to="/er/mechanics" />
        ) : (
          this.lockedMechanics()
        )}
      </>
    )
  }
}
