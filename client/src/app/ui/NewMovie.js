import React, { Component } from "react";
import "antd/dist/antd.css";
import "./../App.css";
import { Drawer, Form, Button, Col, Row, Input, Select } from "antd";
const { Option } = Select;

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", rating: null };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelect = e => {
    console.log(`selected ${e}`);
    // this.setState({ : e.target.value });
  };

  render() {
    return (
      <div>
        <Drawer
          title="Create a new entry"
          width={720}
          onClose={this.props.onClose}
          visible={this.props.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                marginBottom: 100,
                textAlign: "right"
              }}
            >
              <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.props.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="form"
                  label="Title"
                  rules={[{ required: true, message: " enter movie title" }]}
                >
                  <Input
                    onChange={this.handleChange}
                    name={"title"}
                    placeholder="enter movie title"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="mpaa"
                  label="Rating"
                  rules={[
                    { required: true, message: "Please choose the Rating" }
                  ]}
                >
                  <Select
                    defaultValue={"NC-17"}
                    onChange={this.handleSelect}
                    placeholder="Please choose the Rating"
                  >
                    <Option value={"G"}>G</Option>
                    <Option value={"PG"}>PG</Option>
                    <Option value={"PG-13"}>PG-13</Option>
                    <Option value={"NC-17"}>NC-17</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter url description"
                    }
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default NewMovie;
