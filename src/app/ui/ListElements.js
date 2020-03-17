import React, { Component, Fragment } from "react";
import {
  ListItemSecondaryAction,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";

class ListElements extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    return (
      <ListItem
        button
        selected={this.props.isSelected}
        key={this.props.index}
        alignItems={"flex-start"}
        onClick={this.props.handleClickList(this.props.index)}
      >
        <ListItemIcon>
          <TheatersIcon fontSize={"large"} color={"secondary"} />
        </ListItemIcon>
        <ListItemText
          primary={this.props.title}
          secondary={
            <Fragment>
              <Typography
                component={"span"}
                variant={"caption"}
                color={"textSecondary"}
              >
                {this.props.mpaa}
              </Typography>
            </Fragment>
          }
        />
        <ListItemSecondaryAction>
          <Checkbox edge={"end"} input className="d-flex center flex-column" />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default ListElements;
