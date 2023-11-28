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

	const getAll = async () => {
		try {
			const response = await courseInstance.get("/get-all", {
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

	const getAllByInstructorReference = async (
		data: string | null | undefined
	) => {
		try {
			const response = await courseInstance.get(
				`/get-all-by-instructor-reference/${data}`,
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
			const response = await courseInstance.get(
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

	const updateOneById = async (formData: {
		[k: string]: string | String | null | undefined;
	}) => {
		try {
			const response = await courseInstance.patch(
				"/update-one-by-id",
				formData,
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

	const uploadThumbnail = async (formData: {
		courseReference: string | undefined;
		thumbnail: File | null;
	}) => {
		try {
			const response = await courseInstance.patch(
				"/upload-thumbnail",
				formData,
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

	const uploadPromoVideo = async (formData: {
		courseReference: string | undefined;
		promoVideo: File | null;
	}) => {
		try {
			const response = await courseInstance.patch(
				"/upload-promo-video",
				formData,
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

	const sendPublicationRequest = async (formData: {
		courseReference: string | null | undefined;
	}) => {
		try {
			const response = await courseInstance.post(
				"/course-publication-request",
				formData,
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

	const publishCourse = async (formData: {
		courseReference: string | null | undefined;
	}) => {
		try {
			const response = await courseInstance.post(
				"/publish-course",
				formData,
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
		createCourse,
		getAll,
		getAllByInstructorReference,
		getOneByCourseReference,
		updateOneById,
		uploadThumbnail,
		uploadPromoVideo,
		sendPublicationRequest,
		publishCourse,
	};
};

export default useCourse;
