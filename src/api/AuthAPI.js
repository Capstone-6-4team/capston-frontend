import axios from "axios";

export function getToken(loginbody) {
    return axios.post("/api/auth/login", loginbody);
}