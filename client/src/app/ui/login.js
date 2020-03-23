import React, { Component } from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default class Login extends Component {
  // noinspection MissingMethodCommentInspection
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", fullName: "" };
  }

  /**
   * handle login
   * @param e
   */
  handleSubmit = async e => {
    e.preventDefault();
    const token = await fetch("./api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => data.token);

    const base64 = token.split(".")[1];
    const payload = JSON.parse(atob(base64));

    this.props.handleLogin(
      token,
      {
        _id: payload._id,
        username: payload.username
      },
      () => {
        this.props.history.push("/movies");
      }
    );
    // console.log(token);
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
        <input type={"submit"} />
      </form>
    );
  }
}
