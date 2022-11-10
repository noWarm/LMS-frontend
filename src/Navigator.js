
import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { AppContext } from "./AppProvider";

const Navigator = () => {
    const { 
        ["token"] : [token, setToken],
        ["handleLogout"] : handleLogout,
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