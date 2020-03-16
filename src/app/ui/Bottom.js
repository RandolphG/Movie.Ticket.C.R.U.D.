import React, { Component } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SearchField from "./SearchField";
class Bottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: ""
    };
  }
  handleChange = event => {
    this.setState({ values: event.target.value });
    console.log(this.state.values);
  };
  render() {
    return (
      <AppBar
        style={{ top: "auto", bottom: 0 }}
        position="fixed"
        color="default"
      >
        <Toolbar>
          <div style={{ flexGrow: 1 }} />
          <SearchField
            props={this.props.movies}
            handleChange={this.handleChange}
          />
          <Button
            onClick={event => this.props.updateList(event)}
            variant="contained"
            edge={"end"}
            className="d-flex mr-4 flex-column"
            color="default"
            size="small"
            startIcon={<UpdateIcon />}
          >
            UPDATE
          </Button>
          <Button
            onClick={event => this.props.removeFromList(event)}
            variant="contained"
            edge={"end"}
            className="d-flex mr-4 flex-column"
            color="default"
            size="small"
            startIcon={<DeleteIcon />}
          >
            DELETE
          </Button>
          <Button
            onClick={event => this.props.addMovie(event)}
            variant="contained"
            edge={"end"}
            className="d-flex flex-column"
            color="secondary"
            size="small"
            startIcon={<PlaylistAddIcon />}
          >
            ADD
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Bottom;
