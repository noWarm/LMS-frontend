import { useContext } from "react";
import { AppContext } from "./AppProvider";
import Navigator from "./Navigator";
import SmallProfile from "./SmallProfile";

function Header({handleLogout }) {
    const { 
        ["token"] : [token, setToken],
      } = useContext(AppContext);

    return (
        <>
            Header
            <Navigator handleLogout={handleLogout} token={token}/>

            {( token && <SmallProfile/> )}
        </>
    );
}

export default Header;