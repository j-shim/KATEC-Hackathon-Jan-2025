import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoBoard from "./components/TodoBoard";
import { Row, Col, Container } from "react-bootstrap";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	if (!isLoggedIn) {
		return (
			<Router>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<Login />} />
				</Routes>
			</Router>
		);
	}
	return (
		<Container>
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
			<TodoBoard />
		</Container>
	);
};

export default App;
