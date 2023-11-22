import courseInstance from "../utils/courseInstance";
import { useDispatch, useSelector } from "react-redux";
import { IAuthStateProp } from "../interfaces/stateInterface";
import { jwtDecode } from "jwt-decode";
import { removeSignin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
	exp?: number;
}

type Category = string | null;

const useCourse = () => {
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

	const createCourse = async (formData: {
		instructorReference: string | null | undefined;
		title: string;
		categoryReference: Category;
	}) => {
		try {
			const response = await courseInstance.post("/create", formData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	return { createCourse };
};

export default useCourse;
