import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  User,
  LogOut,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./VolunteerPage.css";

function VolunteerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([
    {
      id: 1,
      item: "Canned Goods",
      amount: "50 cans",
      shelter: "Downtown Shelter",
      time: "2 hours left",
      status: "open",
    },
    {
      id: 2,
      item: "Fresh Vegetables",
      amount: "20 lbs",
      shelter: "Community Center",
      time: "4 hours left",
      status: "open",
    },
    {
      id: 3,
      item: "Bread",
      amount: "30 loaves",
      shelter: "Hope Haven",
      time: "1 hour left",
      status: "open",
    },
    {
      id: 4,
      item: "Dairy Products",
      amount: "15 gallons",
      shelter: "Family Support Center",
      time: "5 hours left",
      status: "open",
    },
  ]);
  const [myDonations, setMyDonations] = useState([]);

  const handleLogout = () => {
    navigate("/");
  };

  const acceptRequest = (request) => {
    const updatedRequests = requests.map((r) =>
      r.id === request.id ? { ...r, status: "accepted" } : r
    );
    setRequests(updatedRequests);
    setMyDonations([
      ...myDonations,
      { ...request, acceptedAt: new Date().toLocaleTimeString() },
    ]);
  };

  const markDelivered = (id) => {
    setMyDonations(myDonations.filter((d) => d.id !== id));
  };

  const reportIssue = (id) => {
    alert(`Report submitted for donation #${id}`);
  };

  return (
    <div className="volunteer-page">
      {/* Header */}
      <header className="volunteer-header">
        <div className="header-content">
          <div className="header-left">
            <Heart className="header-icon" size={32} />
            <div>
              <h1 className="header-title">Food Share</h1>
              <p className="header-subtitle">Volunteer Portal</p>
            </div>
          </div>
          <div className="header-right">
            <div className="user-badge">
              <User size={18} />
              <span>John Volunteer</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="volunteer-nav">
        <button
          onClick={() => setActiveTab("requests")}
          className={`nav-tab ${activeTab === "requests" ? "active" : ""}`}
        >
          <Package size={18} />
          Available Requests
        </button>
        <button
          onClick={() => setActiveTab("donations")}
          className={`nav-tab ${activeTab === "donations" ? "active" : ""}`}
        >
          <CheckCircle size={18} />
          My Donations ({myDonations.length})
        </button>
      </nav>

      {/* Main Content */}
      <main className="volunteer-main">
        {activeTab === "requests" && (
          <div className="content-section">
            <div className="section-header">
              <h2>Available Food Requests</h2>
              <p>
                {requests.filter((r) => r.status === "open").length} requests
                waiting for volunteers
              </p>
            </div>

            <div className="requests-grid">
              {requests
                .filter((r) => r.status === "open")
                .map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="card-badge">Urgent</div>
                    <div className="card-header">
                      <Package className="card-icon" size={28} />
                    </div>
                    <h3 className="card-title">{request.item}</h3>
                    <p className="card-shelter">{request.shelter}</p>

                    <div className="card-details">
                      <div className="detail-item">
                        <Package size={16} />
                        <span>{request.amount}</span>
                      </div>
                      <div className="detail-item time-detail">
                        <Clock size={16} />
                        <span>{request.time}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => acceptRequest(request)}
                      className="accept-btn"
                    >
                      Accept Request
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div className="content-section">
            <div className="section-header">
              <h2>My Active Donations</h2>
              <p>Track your donation deliveries</p>
            </div>

            {myDonations.length === 0 ? (
              <div className="empty-state">
                <Package className="empty-icon" size={64} />
                <h3>No Active Donations</h3>
                <p>Accept a request to start helping shelters in need</p>
                <button
                  onClick={() => setActiveTab("requests")}
                  className="browse-btn"
                >
                  Browse Requests
                </button>
              </div>
            ) : (
              <div className="donations-grid">
                {myDonations.map((donation) => (
                  <div key={donation.id} className="donation-card">
                    <div className="donation-status">
                      <CheckCircle size={20} />
                      <span>In Progress</span>
                    </div>

                    <h3 className="card-title">{donation.item}</h3>
                    <p className="card-shelter">{donation.shelter}</p>

                    <div className="card-details">
                      <div className="detail-item">
                        <Package size={16} />
                        <span>{donation.amount}</span>
                      </div>
                      <div className="detail-item time-detail">
                        <Clock size={16} />
                        <span>{donation.time}</span>
                      </div>
                    </div>

                    <div className="accepted-info">
                      <small>Accepted at {donation.acceptedAt}</small>
                    </div>

                    <div className="donation-actions">
                      <button
                        onClick={() => markDelivered(donation.id)}
                        className="deliver-btn"
                      >
                        Mark as Delivered
                      </button>
                      <button
                        onClick={() => reportIssue(donation.id)}
                        className="report-btn"
                      >
                        <AlertCircle size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default VolunteerPage;
