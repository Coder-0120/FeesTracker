import './App.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './Pages/StudentLogin';
import AdminLogin from './Pages/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentRegister from './Pages/StudentRegister';
import StudentDashboard from './Pages/StudentDashBoard';
import AdminDashboard from './Pages/AdminDashboard';
import Navbar from './Components/Navbar';
import ManageStudents from './Pages/ManageStudents';
import StudentsbyBranch from './Pages/StudentsbyBranch';
import StudentAlerts from './Pages/StudentAlerts';
import AdminAlerts from './Pages/AdminAlerts';
import Analytics from './Pages/Analytics';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {

  const isLoggedIn = localStorage.getItem("adminInfo"); 
  return isLoggedIn ? children : <Navigate to="/admin-login" />;
};


function App() {
  return (
  
   <Router >
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path='/student-login' element={<StudentLogin/>}></Route>
        <Route path='/student-register' element={<StudentRegister/>}></Route>
        <Route path='/student-dashboard' element={<StudentDashboard/>}></Route>
        <Route path='/student-alerts' element={<StudentAlerts/>}></Route>
        <Route path='/admin-login' element={<AdminLogin/>}></Route>
        <Route path='/admin-dashboard' element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>}></Route>
        <Route path='/admin-alerts' element={<AdminProtectedRoute><AdminAlerts/></AdminProtectedRoute>}></Route>
        <Route path='/analytics' element={<AdminProtectedRoute><Analytics/></AdminProtectedRoute>}></Route>
        <Route path='/manage-students' element={<AdminProtectedRoute><ManageStudents/></AdminProtectedRoute>}></Route>
        <Route path='/manage-students/:branch' element={<AdminProtectedRoute><StudentsbyBranch/></AdminProtectedRoute>}></Route>
      </Routes>
    </Router>
  );
}


export default App;
