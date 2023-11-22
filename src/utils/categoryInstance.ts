import axios from "axios";

const categoryInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/categories`,
	timeout: 20000,
});

export default categoryInstance;
