import axios from "axios";

const authInstance = axios.create({
	baseURL: "http://localhost:8000/api/auths",
	timeout: 20000,
});

export default authInstance;
