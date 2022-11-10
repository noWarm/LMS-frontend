import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppProvider";
import CourseList from "./CourseList";
import Header from "./Header";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [isStudent, setIsStudent] = useState(null);
    const [learningCourses, setLearningCourses] = useState([]);
    const [teachingCourses, setTeachingCourses] = useState([]);

    const { 
        ["token"] : [token, setToken],
      } = useContext(AppContext);

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

    return(
        <>
            <Header/>
            <h1>Dashboard</h1>
            <h2>Your Courses</h2>
            {
                isLoading ? (<>Loading ...</>) :
                <CourseList learningCourses={learningCourses} teachingCourses={teachingCourses} />
            }
            
            <NavLink to="/courses/new">Add New Course</NavLink>
        </>
    );
}

export default Dashboard;