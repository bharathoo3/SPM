import React from 'react';
import './page.css';

import image1 from './image1.png';
import { useNavigate } from "react-router-dom";

export default function Stud() {
    const nav = useNavigate();
    return (
        <div>
            <div className="content" id='one'>
                <div className="head">
                    <h1>Login Here</h1>
                </div>
                <div className="aten">
                    <button type="button" className="admin" id='btn1' onClick={() => nav('/Login',{state:{msg:'admin'}})}>
                        <img src="https://img.icons8.com/?size=100&id=RtB2Iw4Wrg6G&format=png&color=1A1A1A" alt="Admin" className="std" />
                        <br /> ADMIN    
                    </button>
                    <button type="button" className="teac" onClick={() => nav('/Login',{state:{msg:'teacher'}})}>
                        <img src="https://img.icons8.com/?size=100&id=L9KxyvpfmbOv&format=png&color=1A1A1A" alt="Teacher" className="std" />
                        TEACHER
                    </button>
                    <button type="button" className="stud" onClick={() => nav('/Login',{state:{msg:'student'}})}>
                        <img src="https://img.icons8.com/?size=100&id=1RNKkGO3VxHR&format=png&color=1A1A1A" alt="Student" className="std" />
                        STUDENT
                    </button>
                </div>
            </div>
            
        </div>
    );
}
