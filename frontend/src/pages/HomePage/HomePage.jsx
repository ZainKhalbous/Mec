import React, { useEffect, useRef } from 'react';
import './HomePage.css';

const LandingPage = () => {
  const featureCardsRef = useRef([]);

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleSmoothScroll));

    // Intersection Observer for fade-in animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    featureCardsRef.current.forEach(card => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      links.forEach(link => link.removeEventListener('click', handleSmoothScroll));
      featureCardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <div className="nav-container">
          <div className="logo">
            <i className="fas fa-hand-holding-heart"></i>
            MECRelief
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="auth-buttons">
            <a href="/login" className="btn btn-outline">Login</a>
            <a href="/login" className="btn btn-primary">Sign Up</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">MECRelief</h1>
          <p className="hero-subtitle">
            Connecting communities in crisis. Real-time emergency response and resource coordination when seconds matter most.
          </p>
          <div className="hero-buttons">
            <a href="/emergency" className="btn btn-large btn-emergency">
              <i className="fas fa-bell"></i> Emergency Alert
            </a>
            <a href="/shelter" className="btn btn-large btn-primary">
              <i className="fas fa-map-marker-alt"></i> Find Shelter
            </a>
            <a href="/volunteer" className="btn btn-large btn-outline btn-outline-white">
              <i className="fas fa-hands-helping"></i> Volunteer Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">How We Help in Emergencies</h2>
          <div className="features-grid">
            <div 
              className="feature-card" 
              ref={el => featureCardsRef.current[0] = el}
            >
              <div className="feature-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="feature-title">Real-Time Shelter Mapping</h3>
              <p className="feature-description">
                Instantly locate the nearest emergency shelters with real-time availability updates and directions.
              </p>
            </div>
            
            <div 
              className="feature-card" 
              ref={el => featureCardsRef.current[1] = el}
            >
              <div className="feature-icon">
                <i className="fas fa-sms"></i>
              </div>
              <h3 className="feature-title">Instant SMS Alerts</h3>
              <p className="feature-description">
                Receive critical emergency notifications via SMS, even without internet access.
              </p>
            </div>
            
            <div 
              className="feature-card" 
              ref={el => featureCardsRef.current[2] = el}
            >
              <div className="feature-icon">
                <i className="fas fa-hands"></i>
              </div>
              <h3 className="feature-title">Resource Coordination</h3>
              <p className="feature-description">
                Efficiently match supplies, volunteers, and resources with those in need during emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>&copy; 2025 MECRelief. All rights reserved.</p>
          <p>Emergency Disaster Response Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;