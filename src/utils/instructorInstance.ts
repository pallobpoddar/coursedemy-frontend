import axios from "axios";

const instructorInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/instructors`,
	timeout: 20000,
});

export default instructorInstance;
