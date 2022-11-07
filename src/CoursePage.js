import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";

const CoursePage = ({ handleLogout }) => {
    const { courseId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState(null);
    const [courseDesc, setCourseDesc] = useState(null);
    const [materialList, setMaterialList] = useState([]);

    const { 
        ["token"] : [token, setToken],
      } = useContext(AppContext);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            console.log(courseId);
            const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}`,{
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            });
            const response_data = await response.json();
            console.log('fetch Account Data in CoursePage');
            console.log(response_data.message);
            console.log(response_data.data);

            const course = response_data.data.course;
            setCourseName(course.name);
            setCourseDesc(course.description);
            setMaterialList(course.materials);

            setIsLoading(false);
        }
        fetchData();
    }, []);

    const downloadHandler = (materialId) => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/materials/${materialId}`,{
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            });
            const response_data = await response.json();
            navigate(response_data);
            // console.log(response_data.message);
            // console.log(response_data.data);

            // setIsLoading(false);
        }

        fetchData();
    }

    if (isLoading) {
        return (
            <>Loading Course Page...</>
        );
    }

    return (
        <>
            <Header handleLogout={handleLogout}/>
            <h1>Course Name : {courseName}</h1>
            <p>Description : {courseDesc}</p>
            <p>List of Materials : </p>
            {
                materialList.length == 0 ? 
                (<p>No materials</p>) :
                (
                    <table>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Download</th>
                        <th>Edit</th>
                        {
                            materialList.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td><button onClick={() => downloadHandler(item.id)}>Download</button></td>
                                    <td><NavLink to={`materials/${item.id}`}>Edit</NavLink></td>
                                </tr>
                            ))
                        }
                    </table>
                )
            }
            <NavLink to="materials/new">New Material</NavLink>
        </>
    );
}

export default CoursePage;