import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoBoard from "./components/TodoBoard/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import api from "./utils/api";
import DonutChart from "./components/DonutChart/DonutChart";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const doneTasks = todoList.filter((task) => task.isDone);

  useEffect(() => {
    const checkAuth = () => {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="));
      if (csrfToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const getTasks = async () => {
    const response = await api.get("/tasks/");
    if (Array.isArray(response.data)) {
      setTodoList(response.data);
    } else {
      console.error("Expected an array, received:", response.data);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks/", {
        name: todoValue,
        category: "productive",
        isDone: false,
        date: new Date().toISOString().split("T")[0],
      });
      if (response.status === 200 || response.status === 201) {
        console.log("success");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log(("error", err));
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}/`);
      if (response.status === 204) {
        getTasks();
      } else {
        throw new Error("task can not be deleted");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const markDone = async (id, currentValue) => {
    try {
      const response = await api.patch(`/tasks/${id}/`, {
        isDone: !currentValue,
      });
      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("task can not be updated");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Container className="container-box">
      {/* 1. Date Box */}
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="date-box">Jan 4th 2024</div>
        </Col>
      </Row>

      {/* 2. Add Task Input + Button */}
      <Row className="justify-content-center add-item-row">
        <Col xs={12} sm={8} md={6}>
          <input
            type="text"
            placeholder="Enter tasks"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={{ span: 2 }}>
          <button className="button-add" onClick={addTask}>
            Add
          </button>
        </Col>
      </Row>

      {/* 3. Todo Board */}
      <Row className="justify-content-center">
        <Col md={8}>
          <TodoBoard
            todoList={todoList}
            onDelete={deleteTask}
            onMarkDone={markDone}
          />
        </Col>
      </Row>

      {/* 4. Donut Chart */}
      <Row className="justify-content-center">
        <Col md={8}>
          <DonutChart doneTasks={doneTasks} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
