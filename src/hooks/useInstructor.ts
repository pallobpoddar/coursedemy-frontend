import instructorInstance from "../utils/instructorInstance";

const useInstructor = () => {
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
