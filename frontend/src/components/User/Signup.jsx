/* eslint-disable no-unused-vars */
import { useState } from "react";
import "../../css/Login.css";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const [email, setEmail] = useState("");
	// const [firstName, setFirstName] = useState("");
	// const [lastName, setLastName] = useState("");
	const [error, setError] = useState("");

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
				window.location.href = "/";
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
					{/* <div className="field-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="field-group">
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							id="first_name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
					<div className="field-group">
						<label htmlFor="last_name">Last Name</label>
						<input
							type="text"
							id="last_name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
                            required
						/>
					</div> */}
					{error && <p className="error">{error}</p>}
					<button id="signup-button" type="submit">
						SIGN UP
					</button>
				</form>
				<p>
					Already have an account? <a href="/">Sign in</a>
				</p>
			</div>
		</div>
	);
};

export default Signup;
