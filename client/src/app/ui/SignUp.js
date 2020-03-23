import React, { Component } from "react";
export default class SignUp extends Component {
  // noinspection MissingMethodCommentInspection
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", fullName: "" };
  }

  /**
   *
   * @param e
   */
  handleSubmit = e => {
    e.preventDefault();
    fetch("./api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => data.user);
  };

  /**
   *
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /**
   * TODO
   * @return {!*}
   */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>UserName</label>
        <br />
        <input
          name={"username"}
          type={"text"}
          value={this.state.username}
          onChange={this.handleChange}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          name={"password"}
          type={"password"}
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <label>Full Name</label>
        <br />
        <input
          name={"fullName"}
          type={"text"}
          value={this.state.fullName}
          onChange={this.handleChange}
        />
        <br />
        <input type={"submit"} />
      </form>
    );
  }
}
