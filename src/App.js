import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  render() {
    return (
      <div>
        {this.state.movies[0] && (
          <Table>
            <thead>
              <tr>
                <th>title</th>
                <th>rating</th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr>
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
export default App;
