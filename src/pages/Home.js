// ==================== pages/Home.js ====================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const featuresIcons = [
  process.env.PUBLIC_URL + '/assets/icon_folder/adopt.png',
  process.env.PUBLIC_URL + '/assets/icon_folder/release.png',
  process.env.PUBLIC_URL + '/assets/icon_folder/community.png'
];

const heroImages = [
  process.env.PUBLIC_URL + '/assets/home_section_images/heroimage1.jpg',
  process.env.PUBLIC_URL + '/assets/home_section_images/heroimage2.jpg',
  process.env.PUBLIC_URL + '/assets/home_section_images/heroimage3.jpg'
];

const facilitiesData = [
  {
    title: 'Modern Shelter',
    image: process.env.PUBLIC_URL + '/assets/home_section_images/ModernShelter.jpg'
  },
  {
    title: 'On-Site Veterinary Clinic',
    image: process.env.PUBLIC_URL + '/assets/home_section_images/vetClinic.jpg'
  },
  {
    title: 'Indoor & Outdoor Play Areas',
    image: process.env.PUBLIC_URL + '/assets/home_section_images/playArea.jpg'
  },
  {
    title: 'Professional Grooming',
    image: process.env.PUBLIC_URL + '/assets/home_section_images/professionalGrooming.png'
  },
  {
    title: 'Training & Socialization',
    image: process.env.PUBLIC_URL + '/assets/home_section_images/Training&Socialization.jpg'
  },
  {
    title: 'Detailed Food Preparation',
    image: process.env.PUBLIC_URL + '/assets/home_section_images/foodPrep.jpeg'
  }
];

const Home = ({ onReleaseClick }) => {
  const navigate = useNavigate();
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  // Auto-slide effect for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 4000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAdoptClick = () => {
    navigate('/pets'); 
  };

  const handleMemberClick = () => {
    navigate('/signup');
  };

  return (
    <div className="page-content">
      {/* ==================== Hero Section with Image Slider ==================== */}
      <div className="hero-section hero-slider">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentHeroImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to <span style={{color:'#FF7F50'}}>Pet Heaven</span></h1>
          <p className="hero-subtitle">Giving abandoned pets a second chance at happiness</p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card clickable" onClick={handleAdoptClick}>
          <img src={featuresIcons[0]} />
          <h3>Adopt a Pet</h3>
          <p>Find your perfect companion from our loving pets waiting for homes</p>
        </div>
        <div className="feature-card clickable" onClick={onReleaseClick}>
          <img src={featuresIcons[1]}/>
          <h3>Release a Pet</h3>
          <p>Help us care for pets that need a new home</p>
        </div>
        <div className="feature-card clickable" onClick={handleMemberClick}>
          <img src={featuresIcons[2]}/>
          <h3>Become a Member</h3>
          <p>Support our mission and stay updated on our pets</p>
        </div>
      </div>

      {/* ======================= ABOUT SECTION =============================*/}

      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About Pet Heaven</h1> {/* Centered the h1 */}

      <div className="mission-section">
        <h2>Our Mission & Purpose</h2>
        <p>
          Pet Heaven is a dedicated nonprofit charity committed to rescuing abandoned cats and dogs. Our mission is to provide comprehensive care—including shelter, essential medical treatment, and unconditional love—while diligently working to find each animal a loving forever home. We firmly believe that every pet deserves compassion, exceptional care, and a second chance at happiness, and that every family deserves the joy of a faithful pet companion.
        </p>
      </div>

      <div className="info-section">
        <h2>Our Facilities</h2>
        {/* ==================== Facilities Grid ==================== */}
        <div className="facilities-grid">
          {facilitiesData.map((facility, index) => (
            <div key={index} className="facility-card">
              <img src={facility.image} alt={facility.title} className="facility-image" />
              <div className="facility-overlay">
                <h3>{facility.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="process-step">
            <h3>For Adopters:</h3>
            <p>Browse our available pets, submit an adoption request, and our staff will contact you for an interview to ensure a perfect match.</p>
            <button style={{backgroundColor:'#2c2c2cff'}} className="btn btn-primary" onClick={handleAdoptClick}>
              Browse
            </button>
          </div>
          <div className="process-step">
            <h3>For Pet Owners:</h3>
            <p>If you can no longer care for your pet, submit a release request. We'll review your submission and arrange for proper care and rehoming.</p>
            <button style={{backgroundColor:'#2c2c2cff'}} className="btn btn-primary" onClick={onReleaseClick}>
              Release
            </button>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-container">
          {/* Contact Info + Form */}
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>If you have any questions, feel free to contact us. Our team will get back to you soon!</p>

            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button style={{backgroundColor:'#4A90A1'}} type="submit">Send Message</button>
            </form>
          </div>

          {/* Google Map */}
          <div className="contact-map">
            <iframe
              title="Pet Heaven Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.640503363984!2d103.72165223690749!3d1.380582379312686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11defd25385d%3A0x26e10214bab8976!2sSingapore%20699012!5e0!3m2!1sen!2ssg!4v1763536031396!5m2!1sen!2ssg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;

