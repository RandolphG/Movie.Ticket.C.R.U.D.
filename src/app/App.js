import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviesPage from "./movie/MoviesPage";
import {
  createMovie,
  findAllMovies,
  removeActor
} from "../services/moviesService";
import "./App.css";
import sound_add from "./../sounds/wav/02 Alerts and Notifications/notification_decorative-01.wav";
import sound_delete from "./../sounds/wav/02 Alerts and Notifications/notification_simple-02.wav";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Alert } from "@material-ui/lab";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      defaultProps: {},
      selectedIndex: null,
      theme: null,
      isOpen: false,
      activeStyle: null,
      isSelected: false,
      sound_update: null,
      add: null,
      delete: null,
      open: false
    };
  }

  handleClose = () => {};

  playSound = audioFile => {
    audioFile.play();
  };

  setAuto = () => {
    this.setState({
      options: this.state.movies,
      getOptionalLabel: option => option.title
    });
  };

  removeFromList = async index => {
    // await removeActor(index);
    console.log("deleted!");
    this.playSound(this.state.delete);
    console.log(this.state.movies.length);
    const movies = [...this.state.movies];
    movies.splice(index, 1);
    console.log(this.state.movies.length);
    this.setState({ movies });
  };

  addToList = async () => {
    const movies = {
      title: "State Management",
      actors: ["Stud Karl", "Jean Willcock", "Teddy Rose"],
      mpaa: "PG"
    };
    this.playSound(this.state.add);
    await createMovie(movies);
    this.setState({ movies: [...this.state.movies, movies] });
    console.log("added to list");
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/movies"}
            render={props => (
              <MoviesPage
                isSelected={this.state.isSelected}
                //onItemSelected={this.onItemSelected}
                removeFromList={this.removeFromList}
                defaultProps={this.state.movies}
                results={this.state.movies.length}
                movies={this.state.movies}
                addMovie={this.addToList}
              />
            )}
          />
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>
        </Switch>
      </Router>
    );
  }

  async componentDidMount() {
    const audio_delete = new Audio(sound_delete);
    const audio_add = new Audio(sound_add);
    const movies = await findAllMovies();
    console.log(movies);
    this.setState({ movies: movies, add: audio_add, delete: audio_delete });
    this.setAuto();
  }
}

export default App;
