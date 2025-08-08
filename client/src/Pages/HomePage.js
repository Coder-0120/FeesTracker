import React from 'react';
import "../Styles/HomePage.css"; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  const user = localStorage.getItem("studentInfo");

  return (
    <section className="fees-hero">
      <div className="fees-hero-content">
        <div className="hero-text-box">
          <h1><span>FeesTracker</span> — Smart Fee Management</h1>
          <p>Track, manage, and analyze student fees with ease and confidence.</p>
          <Link to={user ? "/student-dashboard" : "/student-login"}>
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
        <div className="hero-image-box">
          <img src="https://cdn-icons-png.flaticon.com/512/3461/3461608.png" alt="Fee Management" />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
