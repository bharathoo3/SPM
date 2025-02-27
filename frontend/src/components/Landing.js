import React from 'react';
import logo from './logo1.png';
import './landing.css';
import hed from './header-image.jpg';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const nav = useNavigate();

  const handleLearnMore = () => {
    // You can add some logic here for 'Learn More' button.
    alert('Learn more about Students Progress Management.');
  };

  return (
    <div>
      <div className='header'>
        <img src={hed} className='header-img' alt="header" />
        <div className='header-text'>
          <h1>Student's </h1>
          <h2>
            <span>Progress Management</span>
          </h2>
          <div className='head-btn'>
            {/* LOGIN button will navigate to /Stud */}
            <button className='button1' onClick={() => nav('/type')}>LOGIN</button>
            
            {/* LEARN MORE button */}
            <button className='button2' onClick={handleLearnMore}>LEARN MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
