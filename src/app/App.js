import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviesPage from "./ui/MoviesPage";
import { createMovie, findAllMovies } from "../services/moviesService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [], // array of movies
      open: false
    };
  }

  /**
   * remove list element
   * @param index
   * @returns {Promise<void>}
   */
  removeFromList = async index => {
    const movies = [...this.state.movies];
    movies.splice(index, 1);
    this.setState({ movies });
  };

  /**
   *  adds ite to list element and plays sound
   * @returns {Promise<void>}
   */
  addToList = async () => {
    const movies = {
      title: "State Management",
      actors: ["Stud Karl", "Jean Willcock", "Teddy Rose"],
      mpaa: "PG"
    };
    await createMovie(movies);
    this.setState({ movies: [...this.state.movies, movies] });
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
                movies={this.state.movies}
                addToList={this.addToList}
                removeFromList={this.removeFromList}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }

  async componentDidMount() {
    const movies = await findAllMovies();
    this.setState({ movies });
    console.log(movies);
  }
}

export default App;
