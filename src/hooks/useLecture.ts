import { useDispatch, useSelector } from "react-redux";
import { IAuthStateProp } from "../interfaces/stateInterface";
import { jwtDecode } from "jwt-decode";
import { removeSignin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import lectureInstance from "../utils/lectureInstance";

interface DecodedToken {
	exp?: number;
}

const useLecture = () => {
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

	const createLecture = async (data: {
		sectionReference: string | null | undefined;
		title: string;
	}) => {
		try {
			const response = await lectureInstance.post("/create", data, {
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

	const updateOneByLectureReference = async (data: {
		id: string | null | undefined;
		title?: string;
		isAccessibleToUnsubsribedLearners?: boolean;
	}) => {
		try {
			const response = await lectureInstance.patch(
				"/update-one-by-id",
				data,
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

	const uploadContent = async (data: {
		lectureReference: string | null | undefined;
		content: File | null;
	}) => {
		try {
			const response = await lectureInstance.patch(
				"/upload-content",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	const deleteOneByLectureReference = async (id: string) => {
		try {
			const response = await lectureInstance.delete(
				`/delete-one-by-id/${id}`,
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
		createLecture,
		updateOneByLectureReference,
		uploadContent,
		deleteOneByLectureReference,
	};
};

export default useLecture;
