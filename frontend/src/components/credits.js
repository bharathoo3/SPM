import React, { useState, useEffect } from 'react';

const Credits = ({ studentID }) => {
  const [student, setStudent] = useState(null);
  const [credits, setCredits] = useState({
    assignments: 0,
    midterm: 0,
    finalExam: 0,
    projects: 0,
    attendance: 0,
    internships: 0,
    sports: 0,
    extraCurricular: 0,
    labWork: 0,
    research: 0
  });

  useEffect(() => {
    // Fetch student details
    fetch(`http://localhost:5000/api/students/${studentID}`)
      .then(response => response.json())
      .then(data => {
        setStudent(data);
        if (data.creditsBreakdown) {
          setCredits(data.creditsBreakdown);
        }
      })
      .catch(error => console.error('Error fetching student:', error));
  }, [studentID]);

  const handleChange = (e) => {
    setCredits({ ...credits, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalCredits = Object.values(credits).reduce((acc, val) => acc + val, 0);
    const remainingCredits = 1000 - totalCredits;
    const eligible = totalCredits >= 1000;

    fetch(`http://localhost:5000/api/students/${studentID}/updateCredits`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creditsBreakdown: credits, totalCredits, remainingCredits, eligible }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Credits updated successfully!');
        setStudent(data);
      })
      .catch(error => console.error('Error updating credits:', error));
  };

  return (
    <div>
      <h2>Update Student Credits</h2>
      {student ? (
        <form onSubmit={handleSubmit}>
          {Object.keys(credits).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="number"
                name={key}
                value={credits[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit">Update Credits</button>
        </form>
      ) : (
        <p>Loading student data...</p>
      )}
    </div>
  );
};

export default Credits;
