import React, { useState } from "react";
import "./Tech.css";
export default function Tlogin() {
  const [username, setUsername] = useState("");
  const [registerno, setRegisterno] = useState("");
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, registerno, rollno, email, department });
    alert("Student added successfully!");
  };

  return (
    <div className="Oh">
      {/* Left - Image */}
      <div className="form-image">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230903/pngtree-students-studying-or-writing-on-books-and-tablet-image_13211160.jpg"
          alt="Student Form"
          className="form-image"
        />
      </div>

      <div className="form-container">
        <h2 className="h">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Register No:</label>
          <input
            type="number"
            value={registerno}
            onChange={(e) => setRegisterno(e.target.value)}
            required
          />

          <label>Roll No:</label>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            required
          />

          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
