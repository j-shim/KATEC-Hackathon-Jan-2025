import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
    Link
} from "react-router-dom";
import "./App.css";
import TodoBoard from "./components/TodoBoard/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import EditUserInfo from "./components/User/EditUserInfo";
import api from "./utils/api";
import DonutChart from "./components/DonutChart/DonutChart";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [todoList, setTodoList] = useState([]);
	const [todoValue, setTodoValue] = useState("");

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
						setIsLoggedIn(true);
					} else {
						setIsLoggedIn(false);
					}
				} else {
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsLoggedIn(false);
			}
		};
		checkAuth();
	}, []);

	const handleLoginSuccess = () => {
		setIsLoggedIn(true);
	};

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
					setIsLoggedIn(false);
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
			const response = await api.post("/tasks", {
				task: todoValue,
				isComplete: false,
			});
			if (response.status === 200) {
				console.log("success");
			} else {
				throw new Error("task can not be added");
			}
		} catch (err) {
			console.log(("error", err));
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
		<Router>
			<Container className="container-box">
				<Row className="top-right-corner">
					<Col xs="auto">
						<Link to="/edituser" id="edit-button">EDIT INFO</Link>
							{/* id="edit-button",
						>
							EDIT INFO
						</button> */}
						<button id="signout-button" onClick={handleLogout}>
							SIGN OUT
						</button>
					</Col>
				</Row>
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
							value={todoValue}
							onChange={(event) =>
								setTodoValue(event.target.value)
							}
						/>
					</Col>
					<Col xs={12} sm={2}>
						<button className="button-add" onClick={addTask}>
							Add
						</button>
					</Col>
				</Row>
				<TodoBoard todoList={todoList} />
				<DonutChart />
			</Container>
			<Routes>
				<Route path="/edituser" element={<EditUserInfo />} />
			</Routes>
		</Router>
	);
};

export default App;
