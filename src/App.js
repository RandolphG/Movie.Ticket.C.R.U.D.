import React, { Component } from "react";
import "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviesPage from "./MoviesPage";
import MovieDetailsPage from "./MovieDetailsPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: null };
  }
  setMovie = movie => {
    this.setState({ movie: movie });
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/movies"}
            render={props => <MoviesPage history={props.history} />}
          />
          <Route
            exact
            path={"/movies"}
            render={props => <MovieDetailsPage movie={this.state.movie} />}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
