import axios from "axios";

const sectionInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/sections`,
	timeout: 20000,
});

export default sectionInstance;
