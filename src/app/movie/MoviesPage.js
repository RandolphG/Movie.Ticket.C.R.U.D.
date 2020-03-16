import React, { Component, Fragment } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import Bottom from "../ui/Bottom";
import Top from "../ui/Top";
import TheatersIcon from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";
import sound_add from "./../../sounds/wav/02 Alerts and Notifications/notification_decorative-01.wav";
import sound_select from "./../../sounds/wav/04 Secondary System Sounds/navigation_unavailable-selection.wav";
import sound_update from "./../../sounds/wav/03 Primary System Sounds/navigation_selection-complete-celebration.wav";

class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: "",
      title: "",
      alert: null,
      update: null,
      sound_add: null
    };
  }

  addToList = () => {};

  updateList = event => {
    console.log("sound update clicked");
    this.playSound(this.state.update);
  };

  playSound = audioFile => {
    audioFile.play();
  };
  // click event
  onSelectedItem = (event, index, movie) => {
    this.setState({
      selectedIndex: index,
      title: movie.title
    });
    this.playSound(this.state.alert);
    console.log(
      `selected : ${index} ${movie.title} ${this.state.selectedIndex}`
    );
  };

  componentWillMount() {
    const audio_add = new Audio(sound_add);
    const audio_update = new Audio(sound_update);
    const audio_alert = new Audio(sound_select);
    this.setState({ alert: audio_alert, update: audio_update, add: sound_add });
  }
  handleClick = title => {
    this.props.history.push(`/movie/${title}`);
  };

  render() {
    return (
      <div>
        {this.props.movies && (
          <div>
            <Top results={this.props.results} title={this.state.title} />
            <List
              component={"nav"}
              aria-labelledby={"nested-list-subheader"}
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  List Items
                </ListSubheader>
              }
            >
              {this.props.movies.map((movie, index) => (
                <ListItem
                  button
                  selected={this.state.selectedIndex === index}
                  key={index}
                  alignItems={"flex-start"}
                  onClick={event => this.onSelectedItem(event, index, movie)}
                >
                  <ListItemIcon>
                    <TheatersIcon fontSize={"large"} color={"secondary"} />
                  </ListItemIcon>
                  <ListItemText
                    primary={movie.title}
                    secondary={
                      <Fragment>
                        <Typography
                          component={"span"}
                          variant={"caption"}
                          color={"textSecondary"}
                        >
                          {movie.mpaa}
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <Bottom
          props={this.props.movies}
          updateList={this.updateList}
          movies={this.props.defaultProps}
          addMovie={this.props.addMovie}
          removeFromList={this.props.removeFromList}
        />
      </div>
    );
  }
}

export default MoviesPage;
