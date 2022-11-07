import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

function Dashboard({ token, handleLogout }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isStudent, setIsStudent] = useState(null);
    const [learningCourses, setLearningCourses] = useState([]);
    const [teachingCourses, setTeachingCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch('http://127.0.0.1:8000/api/user',{
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            });
            const response_data = await response.json();
            console.log('fetch Account Data');
            console.log(response_data.message);
            console.log(response_data.data);
            
            setIsStudent(response_data.data.isStudent);
            
            if (response_data.data.isStudent) {
                setLearningCourses(response_data.data.learningCourses);
            } else {
                setTeachingCourses(response_data.data.teachingCourses);
            }

            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>Loading ...</>
        );
    }

    return(
        <>
            <Header token={token} handleLogout={handleLogout}/>
            <h1>Dashboard</h1>

            <h2>Your Courses</h2>
            <ul>
                {
                    learningCourses.map(item => (
                        <li>
                            <a>{item.name}</a>
                        </li>
                    ))
                }
            </ul>
            <ul>
                {
                    teachingCourses.map(item => (
                        <li key={item.id}>
                            <NavLink to={`/courses/${item.id}`}>{item.name}</NavLink>
                        </li>
                    ))
                }
            </ul>
            <NavLink to="/courses/new">New Course</NavLink>
        </>
    );
}

export default Dashboard;