import axios from "axios";

const lectureInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/lectures`,
	timeout: 20000,
});

export default lectureInstance;
