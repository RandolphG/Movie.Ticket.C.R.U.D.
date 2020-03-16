import React, { Component } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";
import MenuIcon from "@material-ui/icons/Menu";

class Top extends Component {
  render() {
    return (
      <AppBar position={"sticky"}>
        <Toolbar>
          <IconButton edge={"start"} color={"default"} aria-label={"menu"}>
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"}>Movie Night</Typography>
          <Typography
            className={"ml-4"}
            component={"p"}
            variant={"h5"}
            color={"textSecondary"}
          >
            {`movie :`}
          </Typography>{" "}
          <Typography
            className={"ml-4"}
            component={"p"}
            variant={"h5"}
            color={"error"}
          >
            {`${this.props.title}`}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Badge badgeContent={this.props.results}>
            <TheatersIcon fontSize={"large"} color={"action"} />
          </Badge>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Top;
