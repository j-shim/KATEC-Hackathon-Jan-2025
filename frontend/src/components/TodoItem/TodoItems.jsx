import React from "react";
import { Col, Row } from "react-bootstrap";
import "./TodoItems.css";

const TodoItems = ({ item, onDelete, onMarkDone }) => {
  return (
    <Row>
      <Col
        xs={12}
        className="todo-item-container"
        style={{
          backgroundColor: item.isDone ? "#f0f0f0" : "transparent",
        }}
      >
        <div
          className="todo-item"
          style={{
            textDecoration: item.isDone ? "line-through" : "none",
            color: item.isDone ? "gray" : "black",
          }}
        >
          <div className="todo-content">{item.name}</div>
        </div>
        <div>
          <button className="button-delete" onClick={() => onDelete(item.id)}>
            Delete
          </button>
          <button
            className="button-delete"
            onClick={() => onMarkDone(item.id, item.isDone)}
            style={{
              backgroundColor: item.isDone ? "gray" : "rgb(60, 193, 25)",
              color: "white",
            }}
          >
            {item.isDone ? "Undo" : "Done"}
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItems;
