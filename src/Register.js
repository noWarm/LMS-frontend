import { useState } from "react";
import Header from "./Header";

function Register({token, handleRegister, handleLogout}) {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleRegister(credentials);
    }
    
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return(
        <>
            <Header token={token} handleLogout={handleLogout}/>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
            <label>
                    Name:
                    <input type="text" name="name" placeholder="name" required value={credentials.name} onChange={handleChange}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" placeholder="email" required value={credentials.email} onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" placeholder="password" required value={credentials.password} onChange={handleChange}/>
                </label>
                <label>
                    Role:
                    <input type="radio" name="role" required checked={credentials.role === "Student"} value="Student" onChange={handleChange}/>Student
                    <input type="radio" name="role" required checked={credentials.role === "Teacher"} value="Teacher" onChange={handleChange}/>Teacher
                </label>
                <input type="submit" value="Register" />
            </form>
        </>
    );
}

export default Register;