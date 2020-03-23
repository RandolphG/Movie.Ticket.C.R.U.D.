import React, { Component } from "react";
import { createMovie, findAllMovies } from "../services/moviesService";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

/* component routes */
import Container from "./ui/Container";
import SignUp from "./ui/SignUp";
import Login from "./ui/Login";

import posed, { PoseGroup } from "react-pose";
const RoutesContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});
class App extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      user: user === "null" ? null : user,
      token: localStorage.getItem("token"),
      movies: [],
      open: false
    };
  }

  /**
   *
   */
  logout = (token, user, cb) => {
    console.log("test");
    this.setState({ token, user }, () => {
      localStorage.clear();
      cb();
    });
  };
  /**
   *
   * @param token
   * @param user
   */
  handleLogin = (token, user, cb) => {
    console.log("test");
    this.setState({ token, user }, () => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      cb();
    });
  };

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
        <RoutesContainer>
          <Switch>
            <Route
              exact
              path={"/movies"}
              render={props =>
                this.state.user ? (
                  <Container
                    user={this.state.user}
                    movies={this.state.movies}
                    addToList={this.addToList}
                    removeFromList={this.removeFromList}
                  />
                ) : (
                  <Redirect to={"/"} />
                )
              }
            />
            <Route exact path={"/signup"} render={props => <SignUp />} />
            <Route
              exact
              path={"/"}
              render={props => (
                <Login history={props.history} handleLogin={this.handleLogin} />
              )}
            />
          </Switch>
        </RoutesContainer>
      </Router>
    );
  }

  async componentDidMount() {
    const movies = await findAllMovies();
    this.setState({ movies });
  }
}

export default App;
