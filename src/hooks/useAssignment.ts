import assignmentInstance from "../utils/assignmentInstance";
import { useDispatch, useSelector } from "react-redux";
import { IAuthStateProp } from "../interfaces/stateInterface";
import { jwtDecode } from "jwt-decode";
import { removeSignin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
	exp?: number;
}

const useAssignment = () => {
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

	const createAssignment = async (formData: {
		courseReference: string | undefined;
		title: string;
		assignment: File | null;
	}) => {
		try {
			const response = await assignmentInstance.post("/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	const getAllByCourseReference = async (
		courseReference: string | undefined
	) => {
		try {
			const response = await assignmentInstance.get(
				`/get-all-by-course-reference/${courseReference}`,
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

	const getOneByCourseReference = async (data: string | null | undefined) => {
		try {
			const response = await assignmentInstance.get(
				`/get-one-by-course-reference/${data}`,
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

	return {
		createAssignment,
		getAllByCourseReference,
		getOneByCourseReference,
	};
};

export default useAssignment;
