import React, { useState } from "react";
import "./Tech.css";
export default function Tech() {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, teacherId, email, department, subject });
    alert("Teacher added successfully!");
  };

  return (
    <div className="Oh">
      <div className="form-image">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230903/pngtree-students-studying-or-writing-on-books-and-tablet-image_13211160.jpg"
          alt="Teacher Form"
          className="form-image"
        />
      </div>
      <div className="form-container">
        <h2 className="h">Add Teacher</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Teacher ID:</label>
          <input
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />

          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
         <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
