
import { NavLink } from "react-router-dom"

const Navigator = ({ token, handleLogout }) => {

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