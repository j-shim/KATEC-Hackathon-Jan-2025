import DatePickerHeader from "./components/DatePickerHeader/DatePickerHeader.jsx";
import CategoryList from "./components/CategoryList/CategoryList.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import TodoBoard from "./components/TodoBoard/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";
import api from "./utils/api";
import DonutChart from "./components/DonutChart/DonutChart";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const doneTasks = todoList.filter((task) => task.isDone);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/users/current/", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            navigate("/");
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      }
    };
    checkAuth();
  }, []);

  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfToken ? csrfToken.split("=")[1] : "";
  };

  const handleLogout = () => {
    fetch("/api/users/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": getCsrfToken(),
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          throw new Error("Logout failed.");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
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
									<Route
											path="/"
											element={<Login onLoginSuccess={handleLoginSuccess} />}
									/>
							</Routes>
					</Router>
			);
	}

  return (
    <Container className="container-box">
      <Row className="top-right-corner">
        <Col xs="auto">
          <Link to="/edituser" id="edit-button">
            EDIT INFO
          </Link>
          <button id="signout-button" onClick={handleLogout}>
            SIGN OUT
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <DatePickerHeader />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <div className="date-box">Jan 4th 2024</div>
        </Col>
      </Row>

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
      <Row className="justify-content-center">
        <Col md={8}>
          <TodoBoard
            todoList={todoList}
            onDelete={deleteTask}
            onMarkDone={markDone}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <DonutChart doneTasks={doneTasks} />
        </Col>
      </Row>
      <CategoryList />
    </Container>
  );
};

export default App;
