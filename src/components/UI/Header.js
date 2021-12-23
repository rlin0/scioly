import React, { Component } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SvgIcon from "@material-ui/core/SvgIcon"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import { ListItemLink } from "./Links"
import { ReactComponent as AverycorpLogo } from "../../images/logo_A_fill_w.svg"

export default class Header extends Component {
  render() {
    return (
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <Typography variant="h6">
            WELCOME, {this.props.username.toUpperCase()}. TEAM{" "}
            {this.props.team.toUpperCase()}.
          </Typography>
          <SvgIcon
            component={AverycorpLogo}
            fontSize="large"
            viewBox="0 -50 240 240"
          />
          <Button color="inherit" onClick={this.props.logout} size="large">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

