import React, { useState, useEffect } from "react";
import "./App.css";
import TodoBoard from "./components/TodoBoard/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";
import api from "./utils/api";

const App = () => {
  const [todoList, setTodoList] = useState([]);

  // const getTasks = async () => {
  //   const response = await api.get("/tasks");
  //   console.log("rrrrr", response);
  //   setTodoList(response.data);
  // };

  const getTasks = async () => {
    const response = await api.get("/tasks/");
    if (Array.isArray(response.data)) {
      setTodoList(response.data);
    } else {
      console.error("Expected an array, received:", response.data);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container className="container-box">
      <Row>
        <Col>
          <div className="date-box">Jan 4th 2024</div>
        </Col>
      </Row>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input type="text" placeholder="Enter tasks" className="input-box" />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add">Add</button>
        </Col>
      </Row>
      <TodoBoard todoList={todoList} />
    </Container>
  );
};

export default App;
