import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";
import Home from "./components/pages/user/Home";
import VerifyEmail from "./components/pages/user/VerifyEmail";
import ForgotPassword from "./components/pages/user/ForgotPassword";
import ResetPassword from "./components/pages/user/ResetPassword";
import PageNotFound from "./components/pages/user/PageNotFound";
import UserAuthentication from "./components/pages/user/UserAuthentication";
import Dashboard from "./components/pages/instructor/Dashboard";
import InstructorAuthentication from "./components/pages/instructor/InstructorAuthentication";
import CourseCreation from "./components/pages/instructor/CourseCreation";

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

					<Route element={<UserAuthentication />}>
						<Route
							path="/user/signup"
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
					</Route>

					<Route element={<InstructorAuthentication />}>
						<Route
							path="/instructor/dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="/instructor/course/create"
							element={<CourseCreation />}
						/>
					</Route>

					<Route
						path="*"
						element={<PageNotFound />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
