import { useContext, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppContext } from './AppProvider';
import CoursePage from './CoursePage';
import Dashboard from './Dashboard';
import Login from './Login';
import NewCourse from './NewCourse';
import NewMaterial from './NewMaterial';
import ProtectedRoutes from './ProtectedRoutes';
import Register from './Register';

function App() {

  const { 
    ["token"] : [token, setToken],
    ["username"] : [username, setUsername],
  } = useContext(AppContext);

  const navigate = useNavigate();

  /*
  * handleRegister will 
  * 1) POST to back end register auth path
  * 2) call handleLogin to login
  */
  const handleRegister = async (credentials) => {
    try {

        const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
             },
            body: JSON.stringify(credentials),
        });
        
        const responseData = await response.json();
        console.log(responseData);
        handleLogin(credentials);

    } catch (e) {
        console.error(e);
    }
  };

  /*
  * handleLogin will 
  * 1) POST to back end login auth path
  * 2) set the token to the returned access token
  * 3) set user name to the returned $user->name
  * 4) navigate to /dashboard
  */
  const handleLogin = async (credentials) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
             },
            body: JSON.stringify(credentials),
        });
        
        const responseData = await response.json();
        setToken(responseData.accessToken);
        setUsername(responseData.name);
        navigate('/dashboard')

    } catch (e) {
        console.error(e);
    }
  };

  /*
  * handleLogout will 
  * 1) GET to back end logout auth path
  * 2) log the response message from server
  * 3) set token to null
  * 4) set username to ""
  * 5) navigate to login page
  */
  const handleLogout = async () => {
    // revoke accessToken on the serverside
    const res = await fetch('http://127.0.0.1:8000/api/logout',{
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });

    const response = await res.json();
    console.log("message from server = " + response.message);

    // clear accesstoken from the localstorage client side
    setToken(null);
    setUsername("");
    navigate('/login')
  };

  

  return (
    <Routes>
      <Route index element = {<Login token={token} handleLogin={handleLogin} handleLogout={handleLogout}/>} />
      <Route path="register" element={<Register handleRegister={handleRegister} token={token} handleLogout={handleLogout}/>} />
      <Route path="login" element={<Login token={token} handleLogin={handleLogin} handleLogout={handleLogout}/>} />
      
      <Route path="dashboard" element={<ProtectedRoutes><Dashboard token={token} handleLogout={handleLogout}/></ProtectedRoutes>} />
      <Route path="courses">
        <Route path="new" element={<ProtectedRoutes><NewCourse handleLogout={handleLogout}/></ProtectedRoutes>} />
        <Route path=":courseId" element={<ProtectedRoutes><CoursePage handleLogout={handleLogout}/></ProtectedRoutes>}>
        </Route>
      </Route>

      <Route path="courses/:courseId/materials">
        <Route path="new" element={<ProtectedRoutes><NewMaterial handleLogout={handleLogout}/></ProtectedRoutes>} />
        {/* <Route path=":materialId" element={<MaterialPage handleLogout={handleLogout}/>} /> */}
      </Route>
    </Routes>
  );
}

export default App;
