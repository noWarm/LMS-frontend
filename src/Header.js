import Navigator from "./Navigator";
import SmallProfile from "./SmallProfile";

function Header({ token, handleLogout, username }) {
    return (
        <>
            Header
            <Navigator handleLogout={handleLogout} token={token}/>

            {( token && <SmallProfile username={username}/> )}
        </>
    );
}

export default Header;