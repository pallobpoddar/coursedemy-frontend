import axios from "axios";

const assignmentInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/assignments`,
	timeout: 20000,
});

export default assignmentInstance;
