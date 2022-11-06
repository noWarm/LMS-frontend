import Navigator from "./Navigator";

function Header({ token, handleLogout }) {
    return (
        <>
            Header
            <Navigator handleLogout={handleLogout} token={token}/>
        </>
    );
}

export default Header;