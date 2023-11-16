import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";
import Home from "./components/pages/user/Home";
import { CssBaseline } from "@mui/material";
import VerifyEmail from "./components/pages/user/VerifyEmail";

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
						path="/learner/signin"
						element={<SignIn />}
					/>
					<Route
						path="/learner/verify-email/:token/:id"
						element={<VerifyEmail />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
