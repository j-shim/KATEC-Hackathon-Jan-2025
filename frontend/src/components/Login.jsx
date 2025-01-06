/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import "../css/Login.css";

const Login = ({ onLoginSuccess }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const getCsrfToken = () => {
		const csrfToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("csrftoken="));
		return csrfToken ? csrfToken.split("=")[1] : "";
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/users/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": getCsrfToken(),
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				onLoginSuccess();
				window.location.reload();
			} else {
				const data = await response.json();
				setError(data.error || "Login failed.");
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-container">
				<h2>Let&apos;s get you signed in!</h2>
				<form onSubmit={handleLogin}>
					<div className="field-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="field-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className="error">{error}</p>}
					<button id="signin-button" type="submit">
						SIGN IN
					</button>
				</form>
				<p>
					Don&apos;t have an account? <a href="/signup">Sign up</a>
				</p>
			</div>
		</div>
	);
};

Login.propTypes = {
	onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
