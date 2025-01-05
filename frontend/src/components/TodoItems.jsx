import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItems = () => {
  return (
    <Row>
      <Col xs={12}>
        <div className="">
          <div className="todo-content">Eating</div>
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
