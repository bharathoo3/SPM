import React, { useState, useEffect } from 'react';
import './TeacherManagement.css';

const TeacherManagement = ({ view, onBack }) => {  // ✅ Accept view as prop
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    password: '',
    Department: '',
    Role:''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then((response) => response.json())
      .then((data) => setTeachers(data || []))
      .catch((error) => console.error('Error fetching teachers:', error.message));
  }, [view]);  // ✅ Depend on view to refetch data when switching tabs

  const handleInputChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text(); // Read error response
          throw new Error(`Failed to add teacher: ${errorText}`);
        }
        return response.json();
      })
      .then((data) => {
        setTeachers([...teachers, data]);
        setNewTeacher({ name: '', subject: '', email: '', phone: '', password: '', Department: '', Role: '' });
      })
      .catch((error) => console.error('Error adding teacher:', error));
    
  };

  const handleDelete = (id) => {
    console.log("Deleting Teacher ID:", id); // ✅ Debugging
    if (!id) {
      console.error("❌ Error: ID is undefined");
      return;
    }
  
    fetch(`http://localhost:5000/api/teachers/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete teacher');
        }
        setTeachers(teachers.filter((teacher) => teacher._id !== id)); 
      })
      .catch((error) => console.error('Error deleting teacher:', error.message));
  };
  
  

  return (
    <div className="teacher-management">
      {/* ✅ Back Button */}
      <button onClick={onBack} className="back-btn">⬅ Back</button> 

      {view === 'addTeacher' ? (
        <form onSubmit={handleSubmit} className="teacher-form">
          <h2>Add Teacher</h2>
          {['name', 'subject', 'email', 'phone', 'password', 'Department','Role'].map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newTeacher[field]}
              onChange={handleInputChange}
              required
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Teacher List</h2>
          {teachers.length === 0 ? (
            <p>No teachers found</p>
          ) : (
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.Department}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.Role}</td>
                    <td>
                      <button onClick={() => handleDelete(teacher._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
