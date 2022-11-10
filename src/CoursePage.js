import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";
import axios from 'axios';
import MaterialList from "./MaterialList";

const CoursePage = () => {
    const { courseId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState(null);
    const [courseDesc, setCourseDesc] = useState(null);
    const [materialList, setMaterialList] = useState([]);
    const [deleting, setDeleting] = useState(false);

    const {["token"] : [token, setToken]} = useContext(AppContext);

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
        // this fetchData will be here not in the AppProvider because other parts of the apps are not concerned.
        // also, it is linked with the STATES such as courseName, courseDescription, materialList of THIS component
    }, [deleting]);

    const deleteHandler = async (materialId) => {
        console.log("in delete handler");
        
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

    if (isLoading) {
        return (
            <>Loading Course Page...</>
        );
    }

    return (
        <>
            <Header/>
            <h1>Course Name : {courseName}</h1>
            <p>Description : {courseDesc}</p>
            <MaterialList materialList={materialList} onDelete={deleteHandler} />
            <NavLink to="materials/new">New Material</NavLink>
        </>
    );
}

export default CoursePage;