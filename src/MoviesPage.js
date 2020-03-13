import React, { Component } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table
} from "react-bootstrap";

class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
    // this.state = { movies: [], stagger: 100, isVisible: true };
  }

  setModalShow = modalShow => {
    this.setState({ modalShow: modalShow });
  };
  handleClickMovie = index => {
    this.setModalShow(true);
    this.props.selected(index);
  };
  // handleClick = title => {
  //   this.props.history.push(`/movie/${title}`);
  // };
  render() {
    return (
      <div>
        {this.props.movies && (
          <div>
            <Button>ADD</Button>
            {this.props.movies.map((movie, index) => (
              <Card
                onClick={() => {
                  this.handleClickMovie(index);
                }}
                as={Container}
                className="m-2 "
              >
                <Row>
                  <Col xs={6} sm={8}>
                    <Card.Body>
                      <Card.Title className="text-capitalize">
                        {movie.title}
                      </Card.Title>
                      <Card.Subtitle className="text-muted">
                        {movie.mpaa}
                      </Card.Subtitle>
                    </Card.Body>
                  </Col>
                  <Col xs={6} sm={4}>
                    <Card.Body className="d-flex flex-column">
                      <Button className="mb-1" size={"sm"} variant={"dark"}>
                        DELETE
                      </Button>
                      <Button size={"sm"} variant={"dark"}>
                        UPDATE
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
                {/*
                <Accordion defaultActiveKey="">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant={"link"}
                        eventKey={0}
                      >
                        Actors
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={0}>
                      <Card.Body>
                        <Table>
                          <tbody>
                            {movie.actors.map(actors => (
                              <tr>
                                <td>{actors}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
*/}
              </Card>
            ))}
          </div>

          /*<Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>title</th>
                <th>rating</th>
              </tr>
            </thead>
            <tbody>
              {this.props.movies.map((movie, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    this.props.selected(index);
                  }}
                >
                  <td>{movie.title}</td>
                  <td>{movie.mpaa}</td>
                </tr>
              ))}
            </tbody>
          </Table>*/
        )}
        {this.props.selectedMovie && (
          <Modal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            size={"lg"}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table>
                <thead>
                  <tr>
                    <th>actors</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.selectedMovie.actors.map(actor => (
                    <tr>
                      <td>{actor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

export default MoviesPage;
