import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUserInfo: (state = initialState, action) => {
			console.log(action.payload.data);
			state.userData = action.payload.data;
		},
	},
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
