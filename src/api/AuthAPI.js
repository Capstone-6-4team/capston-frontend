import axios from "axios";

export function login(loginbody) {
    return axios.post("/api/auth/login", loginbody);
}