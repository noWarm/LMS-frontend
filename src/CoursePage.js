import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";
import axios from 'axios';
// import download from 'downloadjs';

const CoursePage = ({ handleLogout }) => {
    const { courseId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState(null);
    const [courseDesc, setCourseDesc] = useState(null);
    const [materialList, setMaterialList] = useState([]);
    const [deleting, setDeleting] = useState(false);

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
    }, [deleting]);

    const deleteHandler = async (materialId) => {
        console.log("in delete handler");
        // console.log(token);
        // const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/materials/${materialId}`,{
        //     method: 'DELETE',
        //     headers: new Headers({
        //         'Authorization': 'Bearer ' + token
        //     })
        // }); 
        // const response_data = await response.json();
        // console.log(response_data.message);
        
        setDeleting(true);
        console.log(isLoading);
        axios({
            url: `http://127.0.0.1:8000/api/courses/${courseId}/materials/${materialId}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.data);
            setDeleting(false);
        });
        
    }
    
    /*
    // unused
    const downloadHandler = (materialId) => {
        axios({
            url: `http://127.0.0.1:8000/api/courses/${courseId}/materials/${materialId}`,
            method: "GET",
            // responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.headers);
            const filename = response.headers["content-disposition"].match(/filename\s*=\s*(.+)/i)[1];
            console.log(filename);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download", 
                filename
                );
                document.body.appendChild(link);
                link.click();
                link.remove();
        });
        console.log('inside download handler');
        console.log(token);
    };
    */

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
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Download</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {
                            materialList.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    {/* <td><button onClick={() => downloadHandler(item.id)}>Download</button></td> */}
                                    <td><a href={item.filepath}>Download</a></td>
                                    <td><NavLink to={`materials/${item.id}`}>Edit</NavLink></td>
                                    <td><button onClick={() => deleteHandler(item.id)}>Delete</button></td>
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