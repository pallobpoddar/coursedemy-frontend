import axios from "axios";

const authInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/auths`,
	timeout: 20000,
});

export default authInstance;
