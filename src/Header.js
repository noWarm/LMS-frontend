import { useContext } from "react";
import { AppContext } from "./AppProvider";
import Navigator from "./Navigator";
import SmallProfile from "./SmallProfile";

function Header() {
    const { 
        ["token"] : [token, setToken],
        ["handleLogout"] : handleLogout,
      } = useContext(AppContext);

    return (
        <>
            Header
            <Navigator/>
            {( token && <SmallProfile/> )}
        </>
    );
}

export default Header;