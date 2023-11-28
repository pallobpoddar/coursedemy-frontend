import { useSelector } from "react-redux";
import { IAuthStateProp } from "../../../interfaces/stateInterface";
import { Navigate, Outlet } from "react-router-dom";

const InstructorAuthentication = () => {
	const instructorReference: string | null | undefined = useSelector(
		(state: IAuthStateProp) => state.auth.instructorReference?._id
	);
	const adminReference: string | null | undefined = useSelector(
		(state: IAuthStateProp) => state.auth.adminReference?._id
	);
	return (
		<>
			{instructorReference || adminReference ? (
				<Outlet />
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default InstructorAuthentication;
