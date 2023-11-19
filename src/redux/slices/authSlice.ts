import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthSate {
	_id: string | null;
	learnerReference: {
		_id: string | null;
		email: string | null;
		name: string | null;
	} | null;
	instructorReference: {
		_id: string | null;
		email: string | null;
		name: string | null;
	} | null;
	adminReference: {
		_id: string | null;
		email: string | null;
		name: string | null;
	} | null;
	role: string | null;
	isVerified: boolean | null;
	token: string | null;
}

const initialState: IAuthSate = {
	_id: null,
	learnerReference: null,
	instructorReference: null,
	adminReference: null,
	role: null,
	isVerified: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		saveSignin: (state, action: PayloadAction<IAuthSate>) => {
			state._id = action.payload._id;
			state.learnerReference = action.payload.learnerReference;
			state.instructorReference = action.payload.instructorReference;
			state.adminReference = action.payload.adminReference;
			state.role = action.payload.role;
			state.isVerified = action.payload.isVerified;
			state.token = action.payload.token;
		},
		removeSignin: (state) => {
			state._id = null;
			state.learnerReference = null;
			state.instructorReference = null;
			state.adminReference = null;
			state.role = null;
			state.isVerified = null;
			state.token = null;
		},
	},
});

export const { saveSignin, removeSignin } = authSlice.actions;
export default authSlice.reducer;
