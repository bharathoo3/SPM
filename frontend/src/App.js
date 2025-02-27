import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './components/logo1.png';
import Landing from './components/Landing';
import Login from './components/Login'; // Login page
import Admin_dashboard from './components/Admin_dashboard'; // Admin dashboard page
import Stud from './components/Stud'; // Students page
import Admin from './components/Admin'
import Student from './components/Student'
import Teacher from './components/Teacher'
import Class from './components/Class'
import Placement from './components/Placement'
import NeonCursor from './components/NeonCursor';
import TeacherDashboard from './components/TeacherDashboard';
import { Link } from 'react-router-dom';

function App() {
  return (

      <div className="App">
         <NeonCursor/>
        <nav className="navi">
          <img src={logo} alt="logo" />
          <h1>
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      Students Progress
    </Link>
  </h1>
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/type" element={<Stud />} />
          <Route path="/teacher_dashboard/:id" element={<TeacherDashboard />} />
          {/* Admin Dashboard Route */}
          <Route path="/admin_dashboard" element={<Admin_dashboard />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/class" element={<Class />} />
            <Route path="/student_dashboard/:id" element={<Student />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/placement" element={<Placement />} />
          </Routes>
         
        </div>
      </div>
    
  );
}

export default App;
