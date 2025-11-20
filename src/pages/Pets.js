// ==================== pages/Pets.js ====================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import Modal from '../components/Modal';

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function generateAge() {
  const min = 1;
  const max = 7;
  const age = Math.floor(Math.random() * (max - min + 1)) + min;
  return age + ' years';
}

// Shuffle array function using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Pets = ({ isLoggedIn, currentUser, onAdopt }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    type: 'All',
    age: 'All',
    isVaccinated: 'All',
    hasMicrochip: 'All',
    isSterilised: 'All'
  });

  // Adoption form state
  const [adoptionForm, setAdoptionForm] = useState({
    adopterName: '',
    adopterNumber: '',
    adopterEmail: '',
    dogName: '',
    dogBreed: '',
    dogAge: '',
    adoptionPrice: '',
    legalAgreement: false,
    emailAgreement: false,
    paymentAgreement: false
  });

  // Initial hardcoded pets
  const initialPets = [
    { id: 1, name: 'Sakura', type: 'Dog', breed: 'Shiba Inu', age: '3 years', adoptionPrice: '$350', isVaccinated: getRandomBoolean(), isSterilised: getRandomBoolean(), hasMicrochip: getRandomBoolean(), description: 'Friendly and energetic', image: '/assets/Sakura.jpeg' },
    { id: 2, name: 'YuWen', type: 'Dog', breed: 'Local', age: '2 years', adoptionPrice: '$250', isVaccinated: getRandomBoolean(), isSterilised: getRandomBoolean(), hasMicrochip: getRandomBoolean(), description: 'Calm and affectionate', image: '/assets/YuWen.jpeg' },
    { id: 3, name: 'Kobbie', type: 'Dog', breed: 'Singapore Special', age: '4 years', adoptionPrice: '$300', isVaccinated: getRandomBoolean(), isSterilised: getRandomBoolean(), hasMicrochip: getRandomBoolean(), description: 'Playful and loyal', image: '/assets/Kobbie.jpeg' },
    { id: 4, name: 'Bel', type: 'Dog', breed: 'Shetland Sheepdog', age: '7 years', adoptionPrice: '$200', isVaccinated: getRandomBoolean(), isSterilised: getRandomBoolean(), hasMicrochip: getRandomBoolean(), description: 'Curious and intelligent', image: '/assets/Bel.jpg' },
    { id: 5, name: 'Monte', type: 'Dog', breed: 'Cross-Breed', age: '5 years', adoptionPrice: '$100', isVaccinated: getRandomBoolean(), isSterilised: getRandomBoolean(), hasMicrochip: getRandomBoolean(), description: 'Protective and loving', image: '/assets/Monte.jpeg' },
    { id: 6, name: 'Bruno', type: 'Dog', breed: 'Poodle', age: '3 years', adoptionPrice: '$300', isVaccinated: getRandomBoolean(), isSterilised: getRandomBoolean(), hasMicrochip: getRandomBoolean(), description: 'Gentle and easygoing', image: '/assets/Bruno.jpeg' }
  ];

  const catNames = ['Whiskers', 'Shadow', 'Simba', 'Oreo', 'Mittens', 'Smokey'];

  // Fetch cat images from API using Axios
  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            limit: 6
          }
        });

        const catData = response.data.slice(0, 6);
        
        // Create additional cat pets from API
        const apiCats = catData.map((cat, index) => ({
          id: 7 + index,
          name: catNames[index],
          type: 'Cat',
          breed: 'Mixed',
          age: generateAge(),
          isVaccinated: getRandomBoolean(), 
          isSterilised: getRandomBoolean(), 
          hasMicrochip: getRandomBoolean(),
          adoptionPrice: '$50',
          description: 'Adorable rescue cat',
          image: cat.url
        }));

        // Combine and shuffle pets randomly
        const allPets = shuffleArray([...initialPets, ...apiCats]);
        setPets(allPets);
        setFilteredPets(allPets);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cats:', err);
        setError('Failed to load some pets from API');
        const shuffled = shuffleArray(initialPets);
        setPets(shuffled);
        setFilteredPets(shuffled);
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  // Apply filters whenever filters or pets change
  useEffect(() => {
    let filtered = [...pets];

    if (filters.type !== 'All') {
      filtered = filtered.filter(pet => pet.type === filters.type);
    }

    if (filters.age !== 'All') {
      const ageNum = parseInt(filters.age);
      filtered = filtered.filter(pet => parseInt(pet.age) === ageNum);
    }

    if (filters.isVaccinated !== 'All') {
      const isVaccinated = filters.isVaccinated === 'Yes';
      filtered = filtered.filter(pet => pet.isVaccinated === isVaccinated);
    }

    if (filters.hasMicrochip !== 'All') {
      const hasMicrochip = filters.hasMicrochip === 'Yes';
      filtered = filtered.filter(pet => pet.hasMicrochip === hasMicrochip);
    }

    if (filters.isSterilised !== 'All') {
      const isSterilised = filters.isSterilised === 'Yes';
      filtered = filtered.filter(pet => pet.isSterilised === isSterilised);
    }

    setFilteredPets(filtered);
  }, [filters, pets]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'All',
      age: 'All',
      isVaccinated: 'All',
      hasMicrochip: 'All',
      isSterilised: 'All'
    });
  };

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setAdoptionForm({
      adopterName: isLoggedIn && currentUser ? currentUser.name : '',
      adopterNumber: '',
      adopterEmail: isLoggedIn && currentUser ? currentUser.email : '',
      dogName: pet.name,
      dogBreed: pet.breed,
      dogAge: pet.age,
      adoptionPrice: pet.adoptionPrice,
      legalAgreement: false,
      emailAgreement: false,
      paymentAgreement: false
    });
  };

  const handleAdoptionSubmit = () => {
    if (!adoptionForm.adopterName || !adoptionForm.adopterNumber || !adoptionForm.adopterEmail ||
        !adoptionForm.dogName || !adoptionForm.dogBreed || !adoptionForm.dogAge || 
        !adoptionForm.adoptionPrice || !adoptionForm.legalAgreement || !adoptionForm.emailAgreement || !adoptionForm.paymentAgreement) {
      alert('Please fill in all fields and accept all agreements');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adoptionForm.adopterEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    onAdopt(adoptionForm);
    alert(`Adoption request submitted successfully for ${adoptionForm.dogName}! ${isLoggedIn ? 'Check your account for details.' : 'Our staff will contact you soon.'}`);
    setSelectedPet(null);
    setAdoptionForm({
      adopterName: '',
      adopterNumber: '',
      adopterEmail: '',
      dogName: '',
      dogBreed: '',
      dogAge: '',
      adoptionPrice: '',
      legalAgreement: false,
      emailAgreement: false,
      paymentAgreement: false
    });
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Loading pets...</h1>
          <p>Please wait while we fetch our adorable friends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Available Pets for Adoption</h1>
        <p>Find your perfect companion</p>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Type:</label>
          <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
            <option value="All">All</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Age:</label>
          <select value={filters.age} onChange={(e) => handleFilterChange('age', e.target.value)}>
            <option value="All">All</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="6">6 years</option>
            <option value="7">7 years</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Vaccinated:</label>
          <select value={filters.isVaccinated} onChange={(e) => handleFilterChange('isVaccinated', e.target.value)}>
            <option value="All">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Microchipped:</label>
          <select value={filters.hasMicrochip} onChange={(e) => handleFilterChange('hasMicrochip', e.target.value)}>
            <option value="All">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sterilised:</label>
          <select value={filters.isSterilised} onChange={(e) => handleFilterChange('isSterilised', e.target.value)}>
            <option value="All">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button className="btn btn-secondary" onClick={resetFilters} style={{backgroundColor:'#4A90A1'}}>Reset Filters</button>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>Showing {filteredPets.length} of {pets.length} pets</p>
      </div>

      <div className="pets-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} onAdopt={handleAdoptClick} />
          ))
        ) : (
          <div className="no-results">
            <p>No pets match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Adoption Modal */}
      <Modal 
        isOpen={selectedPet !== null} 
        onClose={() => setSelectedPet(null)}
        title={`Adopt ${selectedPet?.name}`}
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Adopter Name *</label>
            <input 
              type="text" 
              value={adoptionForm.adopterName}
              onChange={(e) => setAdoptionForm({...adoptionForm, adopterName: e.target.value})}
              placeholder="Your full name"
            />
          </div>
          <div className="form-group">
            <label>Adopter Phone Number *</label>
            <input 
              type="tel" 
              value={adoptionForm.adopterNumber}
              onChange={(e) => setAdoptionForm({...adoptionForm, adopterNumber: e.target.value})}
              placeholder="+65 1234 5678"
            />
          </div>
          <div className="form-group">
            <label>Adopter Email *</label>
            <input 
              type="email" 
              value={adoptionForm.adopterEmail}
              onChange={(e) => setAdoptionForm({...adoptionForm, adopterEmail: e.target.value})}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="form-group">
            <label>Pet Name</label>
            <input 
              type="text" 
              value={adoptionForm.dogName}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label>Pet Breed</label>
            <input 
              type="text" 
              value={adoptionForm.dogBreed}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label>Pet Age</label>
            <input 
              type="text" 
              value={adoptionForm.dogAge}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label>Adoption Price</label>
            <input 
              type="text" 
              value={adoptionForm.adoptionPrice}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={adoptionForm.legalAgreement}
                onChange={(e) => setAdoptionForm({...adoptionForm, legalAgreement: e.target.checked})}
              />
              <span> I agree to provide proper care, including food, shelter, medical attention, and love for the adopted pet. I understand this is a legal commitment. </span>
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={adoptionForm.paymentAgreement}
                onChange={(e) => setAdoptionForm({...adoptionForm, paymentAgreement: e.target.checked})}
              />
              <span> I agree to pay the full amount of Adoption Price upon Adoption Day. </span>
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={adoptionForm.emailAgreement}
                onChange={(e) => setAdoptionForm({...adoptionForm, emailAgreement: e.target.checked})}
              />
              <span> I acknowledge that this form and its content will be sent to the administrator at admin@petheaven.org. </span>
            </label>
          </div>
          <button className="btn btn-primary btn-full" onClick={handleAdoptionSubmit}>
            Submit Adoption Request
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Pets;