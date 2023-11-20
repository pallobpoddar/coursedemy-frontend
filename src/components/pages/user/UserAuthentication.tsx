import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAuthSateProp } from "../../../interfaces/stateInterface";

const UserAuthentication = () => {
	const token: string | null = useSelector(
		(state: IAuthSateProp) => state.auth.token
	);
	return <>{token === null ? <Outlet /> : <Navigate to="/" />}</>;
};

export default UserAuthentication;
