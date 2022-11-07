import Header from "./Header";

const NewCourseForm = () => {
    return (
        <>
            <Header token={token} handleLogout={handleLogout} username={username}/>
            <h1>New Course Form</h1>
        </>
    );
};

export default NewCourseForm;