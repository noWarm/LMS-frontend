import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const API_URL = 'http://127.0.0.1:8000/api/';

    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );
    const [username, setUsername] = useState(
        localStorage.getItem('username') || null
    );

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }, [token, username]);

    /*
    * handleRegister will 
    * 1) POST to back end register auth path
    * 2) call handleLogin to login
    */
    const handleRegister = async (credentials) => {
        try {

            const response = await fetch(API_URL+"auth/register", {
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
            const response = await fetch(API_URL + "auth/login", {
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
    * 1) GET to back end logout auth path with token
    * 2) log the response message from server
    * 3) set token to null
    * 4) set username to ""
    * 5) navigate to login page
    */
    const handleLogout = async () => {
        // revoke accessToken on the serverside
        const res = await fetch(API_URL + "logout", {
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

    /*
    * handleCreateCourse will 
    * 1) POST to back end with token
    * 2) log the response message from server
    * 3) navigate to dashboard page
    */
    const handleCreateCourse = async (courseInfo) => {
        try {
    
            const response = await fetch(API_URL + "course", {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                 }),
                body: JSON.stringify(courseInfo),
            });
            
            const responseData = await response.json();
            console.log(responseData);
            navigate('/dashboard');
    
        } catch (e) {
            console.error(e);
        }
    };

    /*
    * handleCreateMaterial will 
    * 1) create newFormData with the specified params
    * 2) POST to back end with token
    * 3) log the response message from server
    * 4) navigate to the course page of this material
    */
    const handleCreateMaterial = async (materialInfo, selectedFile, courseId) => {
        const formData = new FormData();
        formData.append('name', materialInfo.name);
        formData.append('description', materialInfo.description);
        formData.append('materialFile', selectedFile);

        try {
            const response = await fetch(API_URL + "courses/" + `${courseId}/materials`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                 }),
                body: formData,
            });
            
            const responseData = await response.json();
            console.log(responseData);
            navigate(`/courses/${courseId}`);
    
        } catch (e) {
            console.error(e);
        }
    };

    const value = {
        token: [token, setToken],
        username: [username, setUsername],
        handleRegister: handleRegister,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleCreateCourse: handleCreateCourse,
        handleCreateMaterial: handleCreateMaterial,
    }

    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    );

    
};

export { AppProvider };