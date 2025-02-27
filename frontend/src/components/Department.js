import React from 'react';
import './Department.css';

export default function Department() {
    return (
        <div className='dept'>
            
                <div className="top">
                    <div className="Dashboard">Dashboard</div>
                    <button className="btn12">Logout</button>
                </div>
                <div className="mid">
                    <div className="left-mid">
                        <div className="lm1"><a>Admin</a></div>
                        <div className="lm2"><a>Class</a></div>
                        <div className="lm3"><a>Student</a></div>
                        <div className="lm4"><a>Teacher</a></div>
                        <div className="lm5"><a>Placement</a></div>
                    </div>
                    <div className="right-mid">
                        <div className="m1"><a>CSE</a></div>
                        <div className="m2"><a>ECE</a></div>
                        <div className="m3"><a>MECH</a></div>
                        <div className="m4"><a>CIVIL</a></div>
                        <div className="m5"><a>EEE</a></div>
                    </div>
                </div>
            </div>
    );
}
