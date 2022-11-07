import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth/provider/AuthProvider";

const AccountContext = createContext(null);

const useAccount = () => {
    return useContext(AccountContext);
};

const fetchAccountData = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/user',{
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    const response_data = await response.json();
    console.log('fetch Account Data');
    console.log(response_data.message);
    return response_data.data;
}

const AccountProvider = ({ children }) => {
    const [accountInfo, setAccountInfo] = useState({
        user: null,
        teachingCourses: null,
        learningCourses: null,
    });

    const { token } = useAuth();
    console.log('AccountProvider Token');
    console.log(token);

    useEffect(() => async () => {
        console.log('in use effect account provider');
        console.log(token);
        const data = await fetchAccountData(token);
        console.log('logging data from fetch');
        console.log(data);
        // setAccountInfo(accountInfo => {
        //     ...accountInfo ,

        //     [user] : data.user
        // });
        setAccountInfo(accountInfo => ({ 
            ...accountInfo, 
            user: data.user, 
            teachingCourses: data.teachingCourses,
            learningCourses: data.learningCourses,
        }));
        console.log('in use effect account provider');
        console.log(accountInfo);
    }, [token]);

    const value = {
        user : accountInfo.user,
        teachingCourses : accountInfo.teachingCourses,
        learningCourses : accountInfo.learningCourses,
    };

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    )
};

export { useAccount, AccountProvider };