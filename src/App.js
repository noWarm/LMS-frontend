import { Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';
import Dashboard from './Dashboard';
import Login from './Login';
import NewCourse from './NewCourse';
import NewMaterial from './NewMaterial';
import ProtectedRoutes from './ProtectedRoutes';
import Register from './Register';

function App() {

  return (
    <Routes>
      <Route index element = {<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="login" element={<Login/>} />
      
      <Route path="dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
      <Route path="courses">
        <Route path="new" element={<ProtectedRoutes><NewCourse/></ProtectedRoutes>} />
        <Route path=":courseId" element={<ProtectedRoutes><CoursePage /></ProtectedRoutes>}>
        </Route>
      </Route>

      <Route path="courses/:courseId/materials">
        <Route path="new" element={<ProtectedRoutes><NewMaterial/></ProtectedRoutes>} />
        {/* <Route path=":materialId" element={<MaterialPage handleLogout={handleLogout}/>} /> */}
      </Route>
    </Routes>
  );
}

export default App;
