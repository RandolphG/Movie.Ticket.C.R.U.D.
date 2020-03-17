import React, { Component } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Statistic, Row, Col } from "antd";
import TheatersIcon from "@material-ui/icons/Theaters";
import { DiffFilled } from "@ant-design/icons";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

class Top extends Component {
  function;

  onFinish() {
    console.log("finished!");
  }

  render() {
    return (
      <AppBar position={"sticky"}>
        <Toolbar>
          <IconButton
            edge={"start"}
            color={"default"}
            aria-label={"menu"}
            onClick={this.props.showDrawer}
          >
            <DiffFilled twoToneColor={"#ffb947"} />
          </IconButton>

          <Typography variant={"h6"}>Movie Night</Typography>

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
