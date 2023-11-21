import instructorInstance from "../utils/instructorInstance";
import { useSelector } from "react-redux";
import { IAuthStateProp } from "../interfaces/stateInterface";

const useInstructor = () => {
	const token = useSelector((state: IAuthStateProp) => state.auth.token);

	const createInstructorProfile = async (data: {
		name: string | null | undefined;
		email: string | null | undefined;
	}) => {
		try {
			const response = await instructorInstance.post(
				"/create-instructor-profile",
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

	return { createInstructorProfile };
};

export default useInstructor;
