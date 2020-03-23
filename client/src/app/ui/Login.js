import React, { Component, Fragment } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import "../App.css";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  /**
   * handle login
   * @param e
   */
  handleSubmit = async values => {
    console.log(values);
    // e.preventDefault();
    const token = await fetch("/api/users/login", {
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
  };

  /**
   *
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <AppBar position={"sticky"}>
          <Toolbar>
            <IconButton
              edge={"start"}
              color={"inherit"}
              aria-label={"menu"}
              onClick={this.props.showDrawer}
            >
              <LoginOutlined twoToneColor={"#ffb947"} />
            </IconButton>

            <Typography
              className={"ml-4"}
              component={"p"}
              variant={"h5"}
              color={"initial"}
            >
              Login
            </Typography>
            <div style={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.handleSubmit}
        >
          <Form.Item
            className="input-icon"
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              name="username"
              onChange={this.handleChange}
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            className="input-icon"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              name="password"
              onChange={this.handleChange}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" value={"login"}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default Login;
