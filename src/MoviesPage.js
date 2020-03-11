import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], stagger: 100, isVisible: true };
  }
  handClick = () => {
    // this.props.history.push(`/movie/${}`);
  };
  render() {
    return (
      <div>
        {this.state.movies && (
          <Table>
            <thead>
              <tr>
                <th>title</th>
                <th>rating</th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie, index) => (
                <tr onClick={this.handleClick(index)}>
                  <td>{movie.title}</td>
                  <td>{movie.mpaa}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }

  async componentDidMount() {
    const movies = await fetch("http://localhost:3001/movies")
      .then(res => res.json())
      .then(data => data.movies);
    this.setState({ movies });
    console.log(this.state.movies);
  }
}

export default MoviesPage;
