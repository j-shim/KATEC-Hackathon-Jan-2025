/* eslint-disable no-unused-vars */
import { useState } from "react";
import "../../css/Login.css";

const EditUserInfo = () => {
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleEdit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/users/current/", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					first_name,
					last_name,
					email,
				}),
			});

			if (response.ok) {
				window.location.href = "/";
			} else {
				const data = await response.json();
				setError(data.error || "Edit failed.");
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-container">
				<h2>Create an Account</h2>
				<form onSubmit={handleEdit}>
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
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							id="first_name"
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
					<div className="field-group">
						<label htmlFor="last_name">Last Name</label>
						<input
							type="text"
							id="last_name"
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
					<div className="field-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					{error && <p className="error">{error}</p>}
					<button id="edit-button" type="submit">
						EDIT
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditUserInfo;
