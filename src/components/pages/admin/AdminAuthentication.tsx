import { useSelector } from "react-redux";
import { IAuthStateProp } from "../../../interfaces/stateInterface";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuthentication = () => {
	const adminReference: string | null | undefined = useSelector(
		(state: IAuthStateProp) => state.auth.adminReference?._id
	);
	return <>{adminReference ? <Outlet /> : <Navigate to="/" />}</>;
};

export default AdminAuthentication;
