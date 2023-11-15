import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";
import Home from "./components/pages/user/Home";
import { CssBaseline } from "@mui/material";

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/signin" element={<SignIn />} />
					<Route path="/user/signup" element={<SignUp />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
