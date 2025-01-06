/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";

const EditUserInfo = () => {
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const getCsrfToken = () => {
		const csrfToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("csrftoken="));
		return csrfToken ? csrfToken.split("=")[1] : "";
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch("/api/users/current/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": getCsrfToken(),
					},
					credentials: "include",
				});

				if (response.ok) {
					const data = await response.json();
					setUsername(data.username);
					setFirstName(data.first_name);
					setLastName(data.last_name);
					setEmail(data.email);
				} else {
					console.error("Failed to fetch user data.");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);

	const handleEdit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/users/current/", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": getCsrfToken(),
				},
				body: JSON.stringify({
					username,
					first_name,
					last_name,
					email,
				}),
			});

			if (response.ok) {
				alert("Edit successful!");
				navigate("/");
			} else {
				const data = await response.json();
				setError(data.error || "Edit failed.");
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="edit-wrapper">
			<div className="edit-container">
				<h2>Any updates?</h2>
				<form onSubmit={handleEdit}>
					<div className="field-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							disabled
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
					<button id="edit-info-button" type="submit">
						EDIT
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditUserInfo;
