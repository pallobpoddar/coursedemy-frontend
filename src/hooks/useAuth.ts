import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authInstance from "../utils/authInstance";
import { addUserInfo } from "../redux/slices/userSlice";

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
			console.log(response.data);
			return response.data;
		} catch (error) {
			return { error: error };
		}}
    return {signup};
};

export default useAuth;
