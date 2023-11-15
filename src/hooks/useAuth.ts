import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import authInstance from "../utils/authInstance";
import { addUserInfo } from "../redux/slices/userSlice";

const useAuth = () => {
	const signup = (formData: {
        name: string;
        email: string;
        password: string;
    }) => {
		authInstance
			.post("/signup", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			// .then((response) => {
			// 	navigate("/user/signin");
			// 	toast.success("You need to sign in now");
			// })
			// .catch((error) => {
			// 	if (error.response && error.response.status === 422) {
			// 		const validationErrors = error.response.data.errors;
			// 		toast.error("Invalid credentials");
			// 	}
			// });
	};

    return {signup};
};

export default useAuth;
