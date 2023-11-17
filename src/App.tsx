import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";
import Home from "./components/pages/user/Home";
import VerifyEmail from "./components/pages/user/VerifyEmail";
import ForgotPassword from "./components/pages/user/ForgotPassword";
import ResetPassword from "./components/pages/user/ResetPassword";

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/learner/signup"
						element={<SignUp />}
					/>
					<Route
						path="/user/signin"
						element={<SignIn />}
					/>
					<Route
						path="/user/verify-email/:token/:id"
						element={<VerifyEmail />}
					/>
					<Route
						path="/user/forgot-password"
						element={<ForgotPassword />}
					/>
					<Route
						path="/reset-password/:token/:id"
						element={<ResetPassword />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
