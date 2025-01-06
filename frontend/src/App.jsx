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
	const [todoList, setTodoList] = useState([]);
	const [todoValue, setTodoValue] = useState("");
	const navigate = useNavigate();

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
			<Row className="add-item-row">
				<Col xs={12} sm={10}>
					<input
						type="text"
						placeholder="Enter tasks"
						className="input-box"
						value={todoValue}
						onChange={(event) => setTodoValue(event.target.value)}
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
			<CategoryList />
		</Container>
	);
};

export default App;
