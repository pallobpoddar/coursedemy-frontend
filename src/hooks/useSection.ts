import { useDispatch, useSelector } from "react-redux";
import { IAuthStateProp } from "../interfaces/stateInterface";
import { jwtDecode } from "jwt-decode";
import { removeSignin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import sectionInstance from "../utils/sectionInstance";

interface DecodedToken {
	exp?: number;
}

const useSection = () => {
	const token = useSelector((state: IAuthStateProp) => state.auth.token);
	if (token) {
		const decodedToken: DecodedToken = jwtDecode(token);
		if (
			decodedToken &&
			decodedToken.exp &&
			decodedToken.exp < Date.now() / 1000
		) {
			const dispatch = useDispatch();
			dispatch(removeSignin());
			const navigate = useNavigate();
			navigate("/user/signin");
		}
	}

	const getAllByCourseReference = async (data: string | null | undefined) => {
		try {
			const response = await sectionInstance.get(
				// `/get-all-by-course-reference/${data}`,
				`/get-all-by-course-reference/${data}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	return { getAllByCourseReference };
};

export default useSection;
