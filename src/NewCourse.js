import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";

const NewCourse = () => {
    const { 
        ["token"] : [token, setToken],
        ["handleCreateCourse"] : handleCreateCourse,
    } = useContext(AppContext);

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleCreateCourse(courseInfo);
    }

    const handleChange = (event) => {
        setCourseInfo({ ...courseInfo, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Header/>
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