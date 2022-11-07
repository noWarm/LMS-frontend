import { useContext } from "react";
import { AppContext } from "./AppProvider";

function SmallProfile() {
    
    const { ["username"] : [username, setUsername] } = useContext(AppContext);
    return (
        <p>Signed in As : {username}</p>
    );
    
}

export default SmallProfile;