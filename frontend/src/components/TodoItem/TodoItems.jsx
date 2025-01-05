import React from "react";
import { Col, Row } from "react-bootstrap";
import "./TodoItems.css";

const TodoItems = ({ item }) => {
  return (
    <Row>
      <Col xs={12} className="todo-item-container">
        <div className="todo-item">
          <div className="todo-content">{item.name}</div>
        </div>
        <div>
          <button className="button-delete">Delete</button>
          <button className="button-delete">Done</button>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItems;
