import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Package, Users } from "lucide-react";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleVolunteerLogin = () => {
    navigate("/volunteer");
  };

  const handleAdminLogin = () => {
    alert("Admin page coming soon!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Heart className="heart-icon" size={64} />
            <h1 className="app-title">Food Share</h1>
            <p className="app-subtitle">
              Connecting donors with shelters in need
            </p>
          </div>

          <div className="login-buttons">
            <button
              onClick={handleVolunteerLogin}
              className="login-btn volunteer-btn"
            >
              <Package size={20} />
              <span>Sign In as Volunteer</span>
            </button>

            <button onClick={handleAdminLogin} className="login-btn admin-btn">
              <Users size={20} />
              <span>Sign In as Admin</span>
            </button>
          </div>

          <div className="login-footer">
            <p>
              New to Food Share? <a href="#signup">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
