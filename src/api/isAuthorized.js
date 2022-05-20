import Cookies from "universal-cookie";

function isAuthorized() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  if (!token) {
    return false;
  } else {
    return true;
  }
}

export default isAuthorized;