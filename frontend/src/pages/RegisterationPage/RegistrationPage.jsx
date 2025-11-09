import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });

  useEffect(() => {
    // Add interactive effects to form controls
    const formControls = document.querySelectorAll('.form-control');
    
    const handleFocus = (e) => {
      e.target.parentElement.style.transform = 'translateY(-2px)';
    };
    
    const handleBlur = (e) => {
      e.target.parentElement.style.transform = 'translateY(0)';
    };

    formControls.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      formControls.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
          userType: formData.userType
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Success
        alert('✅ Account Created Successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        // Error
        alert('Error: ' + (result.error || 'Registration failed'));
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side - Branding */}
        <div className="brand-side">
          <div className="logo floating">
            <i className="fas fa-hand-holding-heart"></i>
            <span className="logo-text">MECRelief</span>
          </div>
          <p className="tagline">Join our emergency response community</p>
          
          <div className="features">
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <div>
                <strong>Verified Safety</strong>
                <div style={{ fontSize: '0.9rem' }}>All users and shelters are verified</div>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-bolt"></i>
              <div>
                <strong>Instant Alerts</strong>
                <div style={{ fontSize: '0.9rem' }}>Real-time emergency notifications</div>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-users"></i>
              <div>
                <strong>Community Support</strong>
                <div style={{ fontSize: '0.9rem' }}>Connect with local volunteers</div>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Shelter Mapping</strong>
                <div style={{ fontSize: '0.9rem' }}>Find safe locations instantly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="form-side">
          <div className="form-header">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">Join MECRelief and help save lives</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Your Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                placeholder="City, Province"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="userType">I want to join as:</label>
              <select
                id="userType"
                name="userType"
                className="form-control"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option value="volunteer">🚗 Volunteer - Help others</option>
                <option value="help_seeker">🆘 Help Seeker - Need assistance</option>
                <option value="donor">🎁 Donor - Provide supplies</option>
                <option value="shelter">🏠 Shelter Provider - Offer space</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              {isLoading && <div className="spinner"></div>}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <a href="/login">Sign in here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;