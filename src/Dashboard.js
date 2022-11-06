import Header from "./Header";

function Dashboard({ token, handleLogout }) {

    return(
        <>
            <Header token={token} handleLogout={handleLogout}/>
            <h1>Dashboard</h1>
            {token}
        </>
    );
}

export default Dashboard;