import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";

const MaterialPage = ({ handleLogout }) => {
    const { materialId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [materialName, setmaterialName] = useState(null);
    const [materialDesc, setmaterialDesc] = useState(null);
    const [materialList, setMaterialList] = useState([]);

    const { 
        ["token"] : [token, setToken],
      } = useContext(AppContext);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            console.log(materialId);
            const response = await fetch(`http://127.0.0.1:8000/api/materials/${materialId}`,{
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            });
            const response_data = await response.json();
            console.log('fetch Account Data in MaterialPage');
            console.log(response_data.message);
            console.log(response_data.data);

            const material = response_data.data.material;
            setmaterialName(material.name);
            setmaterialDesc(material.description);

            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>Loading ...</>
        );
    }

    return (
        <>
            <Header handleLogout={handleLogout}/>
            <h1>Material Name : {materialName}</h1>
            <p>Description : {materialDesc}</p>
            
        </>
    );
}

export default MaterialPage;