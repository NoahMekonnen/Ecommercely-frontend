import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ handleLogout }) => {
    useEffect(() => {
        handleLogout()
    }, [])
    return (
        <div>
        </div>
    )
}

export default Logout;