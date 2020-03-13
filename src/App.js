import React, { Component } from "react";
import "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviesPage from "./MoviesPage";
import {
  addActor,
  createMovie,
  deleteMovie,
  findAllMovies,
  findMovie,
  removeActor,
  updateMovie
} from "./services/moviesService";
import AddMoviePage from "./AddMoviePage";
import UpdateMoviePage from "./UpdateMoviePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], selectedMovieIndex: null };
  }

  selectMovie = index => {
    this.setState({ selectedMovieIndex: index });
  };
  /*  setMovie = movie => {
    this.setState({ movie: movie });
  };*/
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/movies"}
            render={props => (
              <MoviesPage
                movies={this.state.movies}
                selected={this.selectMovie}
                selectedMovie={this.state.movies[this.state.selectedMovieIndex]}
                history={props.history}
              />
            )}
          />
          <Route
            exact
            path={"/movies/add"}
            render={props => <AddMoviePage history={props.history} />}
          />
          <Route
            exact
            path={"/movies/update"}
            render={props => <UpdateMoviePage history={props.history} />}
          />
        </Switch>
      </Router>
    );
  }

  async componentDidMount() {
    const movies = await findAllMovies();
    this.setState({ movies: movies });
    /*findMovie("this time");
    createMovie({
      title: "new to everyone",
      actors: ["tight wad", "lean machine"],
      mpaa: "R"
    });*/
    //updateMovie("The Soupa Man", { title: "Finished Soupa Man" });
    // deleteMovie("git that sucka");
    //addActor("new to everyone", "singleton many");
    // removeActor("new to everyone", "new man");
  }
}

export default App;
