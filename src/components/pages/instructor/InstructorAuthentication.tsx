import { useSelector } from "react-redux";
import { IAuthSateProp } from "../../../interfaces/stateInterface";
import { Navigate, Outlet } from "react-router-dom";

const InstructorAuthentication = () => {
	const instructorReference: string | null = useSelector(
		(state: IAuthSateProp) => state.auth.token
	);
	return (
		<>
			{instructorReference !== null ? (
				<Outlet />
			) : (
				<Navigate to="/user/signin" />
			)}
		</>
	);
};

export default InstructorAuthentication;
