// ==================== components/PetCard.js ====================
import React from 'react';

const PetCard = ({ pet, onAdopt }) => {
  let badgesStr = '';
  
  const badges = [];
  if (pet.isVaccinated) badges.push('Vaccinated');
  if (pet.isSterilised) badges.push('Sterilised');
  if (pet.hasMicrochip) badges.push('Microchipped');
  
  if (badges.length > 0) {
    badgesStr += ' • ' + badges.join(' • ');
  }


  return (
    <div className="pet-card">
      <div className="pet-image">
        <img src={pet.image} alt={`${pet.name} - ${pet.type}`} className="pet-photo"/>
      </div>
      <div className="pet-info">
        <h3>{pet.name}</h3>
        <p className="pet-type">{pet.type} • {pet.breed}{badgesStr}</p>
        <p className="pet-age">Age: {pet.age}</p>
        <p className="pet-description">{pet.description}</p>
        <button className="btn btn-primary" onClick={() => onAdopt(pet)}>
          Adopt {pet.name}
        </button>
      </div>
    </div>
  );
};

export default PetCard;