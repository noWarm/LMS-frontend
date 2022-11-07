import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";

const NewCourse = ({handleLogout}) => {
    const { ["token"] : [token, setToken] } = useContext(AppContext);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        password: "",
    });
    console.log(`token from NewCourse is ${token}`);
    const navigate = useNavigate();

    const handleCreateCourse = async (courseInfo) => {
        try {
    
            const response = await fetch('http://127.0.0.1:8000/api/courses', {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleCreateCourse(courseInfo);
    }

    const handleChange = (event) => {
        setCourseInfo({ ...courseInfo, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Header handleLogout={handleLogout}/>
            <h1>New Course Form</h1>

            <form onSubmit={handleSubmit}>
            <label>
                    Course Name:
                    <input type="text" name="name" placeholder="name" required value={courseInfo.name} onChange={handleChange}/>
                </label>
                <label>
                    Course Description:
                    <input type="text" name="description" placeholder="description" required value={courseInfo.description} onChange={handleChange}/>
                </label>
                <label>
                    Password (optional):
                    <input type="password" name="password" placeholder="password" value={courseInfo.password} onChange={handleChange}/>
                </label>
                <input type="submit" value="Create" />
            </form>


        </>
    );
};

export default NewCourse;