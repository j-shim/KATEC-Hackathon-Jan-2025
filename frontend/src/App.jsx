import "./App.css";
import { useState } from "react";
import DatePickerHeader from "./components/DatePickerHeader/DatePickerHeader.jsx";
import CategoryList from "./components/CategoryList/CategoryList.jsx";
import TodoBoard from "./components/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <DatePickerHeader />
      <Container>
        <Row className="add-item-row">
          <Col xs={12} sm={10}>
            <input type="text" placeholder="Enter tasks" className="input-box" />
          </Col>
          <Col xs={12} sm={2}>
            <button className="button-add">Add</button>
          </Col>
        </Row>
        <TodoBoard />
      </Container>
      <CategoryList />
    </>
  );
};

export default App;
