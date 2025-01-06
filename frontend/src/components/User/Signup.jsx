/* eslint-disable no-unused-vars */
import { useState } from "react";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				navigate("/");
			} else {
				const data = await response.json();
				setError(data.error || "Signup failed.");
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-container">
				<h2>Create an Account</h2>
				<form onSubmit={handleSignup}>
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
					<button id="signup-button" type="submit">
						SIGN UP
					</button>
				</form>
				<p>
					Already have an account? <a href="/login">Sign in</a>
				</p>
			</div>
		</div>
	);
};

export default Signup;
