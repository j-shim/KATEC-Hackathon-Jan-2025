import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoBoard from "./components/TodoBoard/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";
import Login from "./components/Login";
import Signup from "./components/Signup";
import api from "./utils/api";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		const checkAuth = () => {
			const csrfToken = document.cookie
				.split("; ")
				.find((row) => row.startsWith("csrftoken="));
			const sessionId = document.cookie
				.split("; ")
				.find((row) => row.startsWith("sessionid="));
			if (csrfToken || sessionId) {
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
			<Row>
				<Col>
					<div className="date-box">Jan 4th 2024</div>
				</Col>
			</Row>
			<Row className="add-item-row">
				<Col xs={12} sm={10}>
					<input
						type="text"
						placeholder="Enter tasks"
						className="input-box"
					/>
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
