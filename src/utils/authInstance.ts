import axios from "axios";

const authInstance = axios.create({
	baseURL: "http://localhost:8000/api/auths",
	timeout: 5000,
});

export default authInstance;
