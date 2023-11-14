import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";
import HomePage from "./components/pages/user/HomePage";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/user/signin"
						element={<SignIn />}
					/>
					<Route
						path="/user/signup"
						element={<SignUp />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
