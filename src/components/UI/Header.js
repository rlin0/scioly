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

const menuLinks = [
  {
    label: "instructions",
    link: "/instructions",
  },
  {
    label: "escape room",
    link: "/er/main",
  },
  {
    label: "leaderboard",
    link: "/leaderboard",
  },
  {
    label: "credits",
    link: "/credits",
  },
]

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
    }
  }

  updateTime = () => {
    var end_ts = null
    if (this.props.end_ts === null) {
      end_ts = Math.floor(Date.now() / 1000)
    } else {
      end_ts = this.props.end_ts
    }
    var sec_num = end_ts - this.props.start_ts
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds = sec_num - (hours * 3600) - (minutes * 60)

    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    const s = hours + ':' + minutes + ':' + seconds

    this.setState({ time: hours + ':' + minutes + ':' + seconds })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateTime()
    }, 1000)
  }

  render() {
    return (
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <SideBar />
          <Typography variant="h6" style={{ color: "white" }}>
            WELCOME, {this.props.username.toUpperCase()}. TEAM{" "}
            {this.props.team.toUpperCase()}.
          </Typography>
          {this.props.start_ts != null && this.state.time != null && <h4 style={{ color: "white", fontFamily: "Bergen Mono" }}>{this.state.time}</h4>}
          <Button onClick={this.props.logout} size="large">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

// source: https://material-ui.com/components/drawers/#temporary-drawer
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

function SideBar() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    isOpen: false,
  })

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, isOpen: open })
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuLinks.map((menuItem) => (
          <ListItemLink
            key={menuItem.label}
            primary={menuItem.label}
            to={menuItem.link}
          />
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <>
        <IconButton
          onClick={toggleDrawer(true)}
          className={classes.menuButton}
          edge="start"
          aria-label="sidebar"
        >
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
        <Drawer anchor="left" open={state.isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </>
    </div>
  )
}