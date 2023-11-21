import { useSelector } from "react-redux";
import { IAuthStateProp } from "../../../interfaces/stateInterface";
import { Navigate, Outlet } from "react-router-dom";

const InstructorAuthentication = () => {
	const instructorReference: string | null | undefined = useSelector(
		(state: IAuthStateProp) => state.auth.instructorReference?._id
	);
	return <>{instructorReference ? <Outlet /> : <Navigate to="/" />}</>;
};

export default InstructorAuthentication;
