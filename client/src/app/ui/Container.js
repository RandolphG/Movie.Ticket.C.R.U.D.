import React, { Component, Fragment } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from "@material-ui/core";
import Footer from "./Footer";
import Top from "./Top";
import TheatersIcon from "@material-ui/icons/Theaters";
import posed from "react-pose";
import pose from "popmotion-pose";

/* sound files imports */
import addSound from "../../sounds/wav/addSound.wav";
import deleteSound from "../../sounds/wav/deleteSound.wav";
import selectSound from "../../sounds/wav/selectSound.wav";
import updateSound from "../../sounds/wav/updateSound.wav";
import NewMovie from "./NewMovie";

const AUDIO_SELECT = new Audio(selectSound);
const AUDIO_UPDATE = new Audio(updateSound);
const AUDIO_DELETE = new Audio(deleteSound);
const AUDIO_ADD = new Audio(addSound);

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      title: "",
      operation: "",
      visible: false,
      collapsed: false
    };
  }

  showDrawer = () => {
    console.log("clicked");
    this.setState({
      visible: !this.state.visible
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  /**
   * handle update
   * @param event
   */
  handleUpdate = event => {
    this.playSound(AUDIO_UPDATE);
    this.setState({ operation: "UPDATED" });
  };
  /**
   * play audio file
   * @param audioFile
   */
  playSound = audioFile => {
    audioFile.play();
  };

  /**
   * pass index to state and plays sound for selected
   * @param event
   * @param index
   * @param movie
   */
  handleSelected = (event, index, movie) => {
    this.setState({
      selectedIndex: index,
      title: movie.title
    });
    this.playSound(AUDIO_SELECT);
    console.log(
      `selected : index[${index}] ${movie.title} ${this.state.selectedIndex}`
    );
  };

  /**
   * removes item from array and plays sound
   * @param index
   * @returns {Promise<void>}
   */
  handleRemove = async index => {
    this.playSound(AUDIO_DELETE);
    this.props.removeFromList(index);
    this.setState({ operation: "DELETE" });
  };

  /**
   *  adds ite to list and plays sound
   * @returns {Promise<void>}
   */
  handleAdd = async index => {
    this.playSound(AUDIO_ADD);
    this.props.addToList(index);
    this.setState({ operation: "ADDED" });
  };

  componentWillMount() {}

  /**
   *
   * @param title
   */
  handleClick = title => {
    this.props.history.push(`/movie/${title}`);
  };

  render() {
    return (
      <div>
        {this.props.movies && (
          <div>
            <Top
              user={this.props.user}
              results={this.props.movies.length}
              title={this.state.title}
              onClose={this.onClose}
              showDrawer={this.showDrawer}
            />
            <List
              className={"list"}
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
                  onClick={event => this.handleSelected(event, index, movie)}
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
        <Footer
          showDrawer={this.showDrawer}
          operation={this.state.operation}
          title={this.state.title}
          movies={this.props.movies}
          selectedIndex={this.state.selectedIndex}
          updateMovie={this.handleUpdate}
          addMovie={this.handleAdd}
          removeMovie={this.handleRemove}
        />
        <NewMovie
          visible={this.state.visible}
          onClose={this.onClose}
          showDrawer={this.showDrawer}
        />
      </div>
    );
  }
}
export default Container;
