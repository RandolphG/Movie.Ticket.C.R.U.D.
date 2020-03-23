import React, { Component } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Tooltip,
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
            color={"inherit"}
            aria-label={"menu"}
            onClick={this.props.showDrawer}
          >
            <DiffFilled twoToneColor={"#ffb947"} />
          </IconButton>

          <Typography
            variant={"h6"}
          >{`user | ${this.props.user.username}`}</Typography>

          <Typography
            className={"ml-4"}
            component={"p"}
            variant={"h6"}
            color={"inherit"}
          >
            {`${this.props.title}`}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Tooltip placement={"left-end"} title={"movies in results"}>
            <Badge badgeContent={this.props.results}>
              <TheatersIcon fontSize={"large"} color={"action"} />
            </Badge>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Top;
