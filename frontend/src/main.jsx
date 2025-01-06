import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import EditUserInfo from "./components/User/EditUserInfo";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/edituser" element={<EditUserInfo />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	</StrictMode>
);
