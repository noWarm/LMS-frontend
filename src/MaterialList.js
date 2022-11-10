import { NavLink } from "react-router-dom";

const MaterialList = ({ materialList, onDelete }) => {
    return (
        <>
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
                                    <td><button onClick={() => onDelete(item.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </table>
                )
            }
        </>
    );
};

export default MaterialList;