import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAuthStateProp } from "../../../interfaces/stateInterface";

const UserAuthentication = () => {
	const token: string | null = useSelector(
		(state: IAuthStateProp) => state.auth.token
	);

	return <>{token === null ? <Outlet /> : <Navigate to="/" />}</>;
};

export default UserAuthentication;
