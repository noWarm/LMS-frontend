
import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { AppContext } from "./AppProvider";

const Navigator = ({ handleLogout }) => {
    const { 
        ["token"] : [token, setToken],
      } = useContext(AppContext);
    return (
        <nav>
            {(
                !token && <>
                    <NavLink to="/register">register</NavLink>
                    <NavLink to="/login">login</NavLink>
                </>
            )}
            {(
                token && <>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <button onClick={handleLogout}>logout</button>
                </>
            )}
        </nav>
    )
};

export default Navigator;