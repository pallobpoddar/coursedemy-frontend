import axios from "axios";

const instructorInstance = axios.create({
	baseURL: "http://localhost:8000/api/instructors",
	timeout: 20000,
});

export default instructorInstance;
