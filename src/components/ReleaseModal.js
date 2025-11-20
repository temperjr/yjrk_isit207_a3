// ==================== components/ReleaseModal.js ====================
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ReleaseModal = ({ isOpen, onClose, isLoggedIn, currentUser, onRelease }) => {
  const [releaseForm, setReleaseForm] = useState({
    releaserName: '',
    releaserNumber: '',
    releaserEmail: '',
    petName: '',
    petNameBreed: '',
    petAge: '',
    petWeight: '',
    reasonForRelease: '',
    durationOfOwnership: '',
    surrenderFee: '$50',
    legalAgreement: false,
    emailAgreement: false,
    paymentAgreement: false
  });

  // Auto-fill user info when modal opens and user is logged in
  useEffect(() => {
    if (isOpen) {
      setReleaseForm({
        releaserName: isLoggedIn && currentUser ? currentUser.name : '',
        releaserNumber: '',
        releaserEmail: isLoggedIn && currentUser ? currentUser.email : '',
        petName: '',
        petNameBreed: '',
        petAge: '',
        petWeight: '',
        reasonForRelease: '',
        durationOfOwnership: '',
        surrenderFee: '$50',
        legalAgreement: false,
        emailAgreement: false,
        paymentAgreement: false

      });
    }
  }, [isOpen, isLoggedIn, currentUser]);

  const handleSubmit = () => {
    // Validate all fields
    if (!releaseForm.releaserName || !releaseForm.releaserNumber || !releaseForm.releaserEmail ||
        !releaseForm.petName || !releaseForm.petBreed || !releaseForm.petAge || 
        !releaseForm.petWeight || !releaseForm.reasonForRelease || !releaseForm.durationOfOwnership ||
        !releaseForm.surrenderFee || !releaseForm.legalAgreement || !releaseForm.emailAgreement || 
        !releaseForm.paymentAgreement) {
      alert('Please fill in all fields and accept the legal agreement');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(releaseForm.releaserEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    onRelease(releaseForm);
    alert(`Release request submitted successfully! ${isLoggedIn ? 'Check your account for details.' : 'Our staff will contact you soon.'}`);
    onClose();
    // Reset form
    setReleaseForm({
      releaserName: '',
      releaserNumber: '',
      releaserEmail: '',
      petName: '',
      petNameBreed: '',
      petAge: '',
      petWeight: '',
      reasonForRelease: '',
      durationOfOwnership: '',
      surrenderFee: '$50',
      legalAgreement: false,
      emailAgreement: false,
      paymentAgreement: false
    });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Release a Pet"
    >
      <div className="modal-form">
        <div className="form-group">
          <label>Releaser Name *</label>
          <input 
            type="text" 
            value={releaseForm.releaserName}
            onChange={(e) => setReleaseForm({...releaseForm, releaserName: e.target.value})}
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label>Releaser Phone Number *</label>
          <input 
            type="tel" 
            value={releaseForm.releaserNumber}
            onChange={(e) => setReleaseForm({...releaseForm, releaserNumber: e.target.value})}
            placeholder="+65 1234 5678"
          />
        </div>
        <div className="form-group">
          <label>Releaser Email *</label>
          <input 
            type="email" 
            value={releaseForm.releaserEmail}
            onChange={(e) => setReleaseForm({...releaseForm, releaserEmail: e.target.value})}
            placeholder="your.email@example.com"
          />
        </div>
        <div className="form-group">
          <label>Pet Name *</label>
          <input 
            type="text" 
            value={releaseForm.petName}
            onChange={(e) => setReleaseForm({...releaseForm, petName: e.target.value})}
            placeholder="Pet's name"
          />
        </div>
        <div className="form-group">
          <label>Pet Breed *</label>
          <input 
            type="text" 
            value={releaseForm.petBreed}
            onChange={(e) => setReleaseForm({...releaseForm, petBreed: e.target.value})}
            placeholder="e.g., Golden Retriever"
          />
        </div>
        <div className="form-group">
          <label>Pet Age *</label>
          <input 
            type="text" 
            value={releaseForm.petAge}
            onChange={(e) => setReleaseForm({...releaseForm, petAge: e.target.value})}
            placeholder="e.g., 3 years"
          />
        </div>
        <div className="form-group">
          <label>Pet Weight *</label>
          <input 
            type="text" 
            value={releaseForm.petWeight}
            onChange={(e) => setReleaseForm({...releaseForm, petWeight: e.target.value})}
            placeholder="e.g., 25 kg"
          />
        </div>
        <div className="form-group">
          <label>Reason for Release *</label>
          <textarea 
            rows="3"
            value={releaseForm.reasonForRelease}
            onChange={(e) => setReleaseForm({...releaseForm, reasonForRelease: e.target.value})}
            placeholder="Please explain why you need to release your pet"
          />
        </div>
        <div className="form-group">
          <label>Duration of Ownership *</label>
          <input 
            type="text" 
            value={releaseForm.durationOfOwnership}
            onChange={(e) => setReleaseForm({...releaseForm, durationOfOwnership: e.target.value})}
            placeholder="e.g., 2 years"
          />
        </div>
        <div className="form-group">
          <label>Surrender Fee</label>
          <input 
            type="text" 
            value={releaseForm.surrenderFee}
            onChange={(e) => setReleaseForm({...releaseForm, surrenderFee: e.target.value})}
            placeholder="$50"
            readOnly
            className='readonly-input'
          />
        </div>
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={releaseForm.legalAgreement}
              onChange={(e) => setReleaseForm({...releaseForm, legalAgreement: e.target.checked})}
            />
            <span> I hereby surrender all rights to the pet and authorize Pet Heaven to rehome the animal & confirm all information provided is accurate.</span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={releaseForm.paymentAgreement}
              onChange={(e) => setReleaseForm({...releaseForm, paymentAgreement: e.target.checked})}
            />
            <span> I agree to pay the full amount of Surrender Fee upon Release Day. </span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={releaseForm.emailAgreement}
              onChange={(e) => setReleaseForm({...releaseForm, emailAgreement: e.target.checked})}
            />
            <span> I acknowledge that this form and its content will be sent to the administrator at admin@petheaven.org. </span>
          </label>
        </div>
        <button className="btn btn-primary btn-full" onClick={handleSubmit}>
          Submit Release Request
        </button>
      </div>
    </Modal>
  );
};

export default ReleaseModal;