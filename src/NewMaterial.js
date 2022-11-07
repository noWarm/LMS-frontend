import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";

const NewMaterial = ({handleLogout}) => {;
    const { courseId } = useParams();

    const { ["token"] : [token, setToken] } = useContext(AppContext);
    const [materialInfo, setMaterialInfo] = useState({
        name: "",
        description: "",
    });

    const [selectedFile, setSelectedFile] = useState();
    const [isUploaded, setIsUploaded] = useState(false);

    const fileUploadHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsUploaded(true);
    }

    const navigate = useNavigate();

    const handleCreateMaterial = async (materialInfo) => {

        const formData = new FormData();
        formData.append('name', materialInfo.name);
        formData.append('description', materialInfo.description);
        formData.append('materialFile', selectedFile);

        try {
    
            const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/materials`, {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleCreateMaterial(materialInfo);
    }

    const handleChange = (event) => {
        setMaterialInfo({ ...materialInfo, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Header handleLogout={handleLogout}/>
            <h1>New Material Form</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Material Name:
                    <input type="text" name="name" placeholder="name" required value={materialInfo.name} onChange={handleChange}/>
                </label>
                <label>
                    Material Description:
                    <input type="text" name="description" placeholder="description" required value={materialInfo.description} onChange={handleChange}/>
                </label>

                <label>
                    <input type="file" name="materialFile" required onChange={fileUploadHandler}/>
                </label>
                {
                    isUploaded && (
                        <>
                            <p>Size: {selectedFile.size} bytes</p>
                        </>
                    )
                }
                <input type="submit" value="Upload" />
            </form>
        </>
    );
};

export default NewMaterial;