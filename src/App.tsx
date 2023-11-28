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
import CourseAssignments from "./components/pages/instructor/CourseAssignments";
import CourseCurriculum from "./components/pages/instructor/CourseCurriculum";
import AssignmentCreation from "./components/pages/instructor/AssignmentCreation";
import CourseLandingPage from "./components/pages/instructor/CourseLandingPage";
import AssignmentEdit from "./components/pages/instructor/AssignmentEdit";
import CourseSettings from "./components/pages/instructor/CourseSettings";
import AdminAuthentication from "./components/pages/admin/AdminAuthentication";
import PublicationRequest from "./components/pages/admin/PublicationRequest";

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route element={<UserAuthentication />}>
						<Route path="/user/signup" element={<SignUp />} />
						<Route path="/user/signin" element={<SignIn />} />
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
						<Route
							path="/instructor/course/:courseReference/curriculum"
							element={<CourseCurriculum />}
						/>
						<Route
							path="/instructor/course/:courseReference/assignments"
							element={<CourseAssignments />}
						/>
						<Route
							path="/instructor/course/:courseReference/assignments/create"
							element={<AssignmentCreation />}
						/>
						<Route
							path="/instructor/course/:courseReference/landing-page"
							element={<CourseLandingPage />}
						/>
						<Route
							path="/instructor/course/:courseReference/assignments/:assignment"
							element={<AssignmentEdit />}
						/>
						<Route
							path="/instructor/course/:courseReference/settings"
							element={<CourseSettings />}
						/>
					</Route>

					<Route element={<AdminAuthentication />}>
						<Route
							path="/admin/course-publication-request/:courseReference"
							element={<PublicationRequest />}
						/>
					</Route>

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
