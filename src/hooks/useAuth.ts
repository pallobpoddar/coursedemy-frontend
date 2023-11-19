import authInstance from "../utils/authInstance";

const useAuth = () => {
	const signup = async (formData: {
		name: string;
		email: string;
		password: string;
		role: string;
	}) => {
		try {
			const response = await authInstance.post("/signup", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	const signin = async (formData: { email: string; password: string }) => {
		try {
			const response = await authInstance.post("/signin", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	const verifyEmail = async (formData: {
		token: string | undefined;
		id: string | undefined;
	}) => {
		try {
			const response = await authInstance.post("/verify-email", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	const forgotPasswordEmail = async (formData: { email: string }) => {
		try {
			const response = await authInstance.post("/forgot-password", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	const resetPassword = async (formData: {
		token: string | undefined;
		id: string | undefined;
		password: string;
		confirmPassword: string;
	}) => {
		try {
			const response = await authInstance.post("/reset-password", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			return { error: error };
		}
	};

	return { signup, verifyEmail, signin, forgotPasswordEmail, resetPassword };
};

export default useAuth;
