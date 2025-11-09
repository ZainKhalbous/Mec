import "./AdminPage.css";

import React, { useState, useEffect } from 'react';
import { AlertCircle, Package, Clock, CheckCircle, Flag, Plus, Import } from 'lucide-react';


const FOOD_CATEGORIES = [
  'Canned Goods',
  'Fresh Produce',
  'Dairy Products',
  'Bread & Bakery',
  'Meat & Protein',
  'Dry Goods',
  'Beverages',
  'Baby Food',
  'Snacks'
];

const DELIVERY_TIME_HOURS = 4;

const AdminPage = () => {
  const currentUser = { id: 1, name: 'Sarah Johnson', type: 'admin' };
  const [requests, setRequests] = useState([
    {
      id: 1,
      adminId: 1,
      adminName: 'Sarah Johnson',
      category: 'Canned Goods',
      amount: 50,
      unit: 'items',
      description: 'Urgent need for soups and vegetables',
      status: 'open',
      createdAt: new Date().toISOString(),
      expiresAt: null,
      assignedVolunteer: null
    },
    {
      id: 2,
      adminId: 1,
      adminName: 'Sarah Johnson',
      category: 'Fresh Produce',
      amount: 25,
      unit: 'lbs',
      description: 'Fruits and vegetables for meal prep',
      status: 'accepted',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      acceptedAt: new Date(Date.now() - 1800000).toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
      assignedVolunteer: 101,
      volunteerName: 'Mike Chen'
    },
    {
      id: 3,
      adminId: 1,
      adminName: 'Sarah Johnson',
      category: 'Dairy Products',
      amount: 15,
      unit: 'items',
      description: 'Milk, cheese, and yogurt',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      completedAt: new Date(Date.now() - 3600000).toISOString(),
      assignedVolunteer: 102,
      volunteerName: 'Anna Lee'
    }
  ]);

  // Admin creates a resource request
  const createRequest = (category, amount, unit, description) => {
    const newRequest = {
      id: Date.now(),
      adminId: currentUser.id,
      adminName: currentUser.name,
      category,
      amount,
      unit,
      description,
      status: 'open',
      createdAt: new Date().toISOString(),
      expiresAt: null,
      assignedVolunteer: null
    };
    setRequests([newRequest, ...requests]);
  };

  // Report a volunteer
  const reportVolunteer = (requestId, reason) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'reported', reportReason: reason } : req
    ));
  };

  // Check for expired requests
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setRequests(requests.map(req => {
        if (req.status === 'accepted' && req.expiresAt && new Date(req.expiresAt) < now) {
          return { ...req, status: 'expired' };
        }
        return req;
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, [requests]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Shelter Admin Dashboard</h1>
              <p className="text-sm text-gray-600">
                Logged in as: <span className="font-semibold">{currentUser.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-4">
                <p className="text-xs text-gray-500">Total Requests</p>
                <p className="text-2xl font-bold text-emerald-600">{requests.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="space-y-6">
          {/* Create Request */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-6 h-6 text-emerald-600" />
              Request Donation
            </h2>
            <CreateRequestForm onSubmit={createRequest} />
          </div>

          {/* Open Requests */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              Open Requests
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {requests.filter(r => r.status === 'open').length}
              </span>
            </h2>
            <div className="space-y-3">
              {requests.filter(r => r.status === 'open').length === 0 ? (
                <p className="text-gray-500 text-center py-8">No open requests. Create a new request above.</p>
              ) : (
                requests.filter(r => r.status === 'open').map(req => (
                  <RequestCard key={req.id} request={req} />
                ))
              )}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              In Progress
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {requests.filter(r => r.status === 'accepted').length}
              </span>
            </h2>
            <div className="space-y-3">
              {requests.filter(r => r.status === 'accepted').length === 0 ? (
                <p className="text-gray-500 text-center py-8">No deliveries in progress</p>
              ) : (
                requests.filter(r => r.status === 'accepted').map(req => (
                  <RequestCard
                    key={req.id}
                    request={req}
                    onReport={(reason) => reportVolunteer(req.id, reason)}
                    showReportButton
                  />
                ))
              )}
            </div>
          </div>

          {/* Completed & History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              History
              <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {requests.filter(r => ['completed', 'expired', 'reported'].includes(r.status)).length}
              </span>
            </h2>
            <div className="space-y-3">
              {requests.filter(r => ['completed', 'expired', 'reported'].includes(r.status)).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No history yet</p>
              ) : (
                requests.filter(r => ['completed', 'expired', 'reported'].includes(r.status)).map(req => (
                  <RequestCard key={req.id} request={req} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Request Form Component
const CreateRequestForm = ({ onSubmit }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('lbs');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (category && amount) {
      onSubmit(category, amount, unit, description);
      setCategory('');
      setAmount('');
      setDescription('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"> Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select category...</option>
            {FOOD_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="20"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
              <option value="items">items</option>
              <option value="boxes">boxes</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          rows="2"
          placeholder="Additional details about this request..."
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!category || !amount}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
      >
        Create Request
      </button>
    </div>
  );
};

// Request Card Component
const RequestCard = ({ request, onReport, showReportButton }) => {
  const getStatusBadge = () => {
    switch (request.status) {
      case 'open':
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Open</span>;
      case 'accepted':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">In Progress</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">✓ Completed</span>;
      case 'expired':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Expired</span>;
      case 'reported':
        return <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Reported</span>;
      default:
        return null;
    }
  };

  const getTimeRemaining = () => {
    if (!request.expiresAt) return null;
    const now = new Date();
    const expiry = new Date(request.expiresAt);
    const diff = expiry - now;
    if (diff < 0) return 'EXPIRED';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{request.category}</h3>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">{request.amount}</span> {request.unit}
          </p>
        </div>
        {getStatusBadge()}
      </div>
      
      {request.description && (
        <div className="mb-3 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">{request.description}</p>
        </div>
      )}
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Created: {formatDate(request.createdAt)}</span>
        </div>
        
        {request.volunteerName && (
          <div className="flex items-center gap-2 text-gray-600">
            <Package className="w-4 h-4" />
            <span>Volunteer: <span className="font-semibold text-gray-800">{request.volunteerName}</span></span>
          </div>
        )}
        
        {request.status === 'accepted' && (
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-blue-700 font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {getTimeRemaining()}
            </p>
          </div>
        )}
        
        {request.reportReason && (
          <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
            <p className="text-purple-700 font-medium flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Report Reason: {request.reportReason}
            </p>
          </div>
        )}

        {request.status === 'completed' && (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>Delivered on {formatDate(request.completedAt)}</span>
          </div>
        )}
      </div>
      
      {showReportButton && (
        <button
          onClick={() => {
            const reason = prompt('Enter reason for reporting this volunteer:');
            if (reason) onReport(reason);
          }}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 font-medium"
        >
          <Flag className="w-4 h-4" />
          Report Volunteer
        </button>
      )}
    </div>
  );
};

export default AdminPage;