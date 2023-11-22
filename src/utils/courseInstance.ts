import axios from "axios";

const courseInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/courses`,
	timeout: 20000,
});

export default courseInstance;
