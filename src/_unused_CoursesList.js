function CoursesList({ token }) {

    return(
        <>
            <Header token={token} handleLogout={handleLogout}/>
            <h1>CoursesList</h1>
        </>
    );
}

export default CoursesList;