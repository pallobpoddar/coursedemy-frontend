import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserSignIn from "./components/pages/UserSignIn";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<UserSignIn />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
