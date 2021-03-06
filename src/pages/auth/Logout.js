import React, { useEffect } from "react";
import { Redirect } from "react-router-dom"

const Logout = () => {
    useEffect(() => {
        console.log("돌아가냐")
        localStorage.removeItem("token");
        localStorage.removeItem("id");
    })
    return <Redirect to="/" />;
}

export default Logout;