import axios from "axios";

export function signUp(userinfo) {
    return axios.post("/api/user/register", userinfo);
}
// export default getToken;