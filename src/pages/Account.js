// ==================== UPDATED pages/Account.js ====================
import React from 'react';

const Account = ({ isLoggedIn, currentUser }) => {
  if (!isLoggedIn || !currentUser) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <p>Please login to view your account</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>My Account</h1>

      <div className="info-section">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {currentUser.name}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>

      <div className="info-section">
        <h2>Adoption Requests</h2>
        {currentUser.adoptionRequests && currentUser.adoptionRequests.length === 0 ? (
          <p className="empty-message">No adoption requests yet</p>
        ) : (
          <div className="request-list">
            {currentUser.adoptionRequests && currentUser.adoptionRequests.map((req, idx) => (
              <div key={idx} className="request-item">
                <h3>{req.dogName} - {req.dogBreed}</h3>
                <div className="request-details">
                  <p><strong>Adopter:</strong> {req.adopterName}</p>
                  <p><strong>Phone:</strong> {req.adopterNumber}</p>
                  <p><strong>Email:</strong> {req.adopterEmail}</p>
                  <p><strong>Pet Age:</strong> {req.dogAge}</p>
                  <p><strong>Adoption Price:</strong> {req.adoptionPrice}</p>
                  <p><strong>Submitted:</strong> {new Date(req.date).toLocaleDateString()}</p>
                </div>
                <div className="request-status">
                  <span className="status-badge status-pending">Pending Review</span>
                  <span>Please note a copy of your adoption form is sent to your email.</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="info-section">
        <h2>Release Requests</h2>
        {currentUser.releaseRequests && currentUser.releaseRequests.length === 0 ? (
          <p className="empty-message">No release requests</p>
        ) : (
          <div className="request-list">
            {currentUser.releaseRequests && currentUser.releaseRequests.map((req, idx) => (
              <div key={idx} className="request-item">
                <h3>{req.petName} - {req.petBreed}</h3>
                <div className="request-details">
                  <p><strong>Releaser:</strong> {req.releaserName}</p>
                  <p><strong>Phone:</strong> {req.releaserNumber}</p>
                  <p><strong>Email:</strong> {req.releaserEmail}</p>
                  <p><strong>Pet Age:</strong> {req.petAge}</p>
                  <p><strong>Pet Weight:</strong> {req.petWeight}</p>
                  <p><strong>Duration of Ownership:</strong> {req.durationOfOwnership}</p>
                  <p><strong>Reason:</strong> {req.reasonForRelease}</p>
                  <p><strong>Surrender Fee:</strong> {req.surrenderFee}</p>
                  <p><strong>Submitted:</strong> {new Date(req.date).toLocaleDateString()}</p>
                </div>
                <div className="request-status">
                  <span className="status-badge status-pending">Pending Review</span>
                  <span>Please note a copy of your release form is sent to your email.</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;