import { NavLink } from "react-router-dom";

const CourseList = ({ learningCourses=[], teachingCourses=[] }) => {
    return (
        <>
            <ul>
                {
                    learningCourses.map(item => (
                        <li>
                            <a>{item.name}</a>
                        </li>
                    ))
                }
            </ul>
            <ul>
                {
                    teachingCourses.map(item => (
                        <li key={item.id}>
                            <NavLink to={`/courses/${item.id}`}>{item.name}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default CourseList;