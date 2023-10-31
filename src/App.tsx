import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
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
