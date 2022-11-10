import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Header from "./Header";

const NewMaterial = () => {;
    const { courseId } = useParams();

    const { 
        ["token"] : [token, setToken],
        ["handleCreateMaterial"] : handleCreateMaterial,
    } = useContext(AppContext);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleCreateMaterial(materialInfo, selectedFile, courseId);
    }

    const handleChange = (event) => {
        setMaterialInfo({ ...materialInfo, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Header/>
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