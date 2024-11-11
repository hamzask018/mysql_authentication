import React from "react";
import './Home.css'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="nav-container">
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div className="nav-button">
            <button onClick={()=> navigate('/register')}>Login/Signup</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Home;