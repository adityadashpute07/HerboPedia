import React, { useState, useEffect } from 'react';
import { plants } from './data/plants';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="container nav-content">
      <div className="logo fade-in">
        <span className="logo-icon">🌿</span>
        <h1>HerboPedia</h1>
      </div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#plants">Plants</a>
        <a href="#about">About</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="home" className="hero">
    <div className="hero-overlay"></div>
    <div className="container hero-content">
      <h2 className="slide-in">HerboPedia</h2>
      <p className="fade-in">Explore the profound healing power of medicinal plants. Discover their scientific properties, usage, and the wisdom of traditional medicine.</p>
      <a href="#plants" className="btn-primary fade-in">Explore Plants</a>
    </div>
  </section>
);

const PlantCard = ({ plant, onClick }) => (
  <div className="plant-card fade-in" onClick={() => onClick(plant)}>
    <div className="plant-image">
      <img src={plant.image} alt={plant.name} />
      <div className="plant-badge">{plant.qualities[0]}</div>
    </div>
    <div className="plant-info">
      <h3>{plant.name}</h3>
      <p className="scientific-name">{plant.scientificName}</p>
      <div className="plant-qualities">
        {plant.qualities.slice(0, 3).map(q => <span key={q} className="quality">{q}</span>)}
      </div>
    </div>
  </div>
);

const PlantModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-grid">
          <div className="modal-image">
            <img src={plant.image} alt={plant.name} />
          </div>
          <div className="modal-details">
            <h2>{plant.name}</h2>
            <p className="scientific-name">{plant.scientificName}</p>
            <p className="description">{plant.description}</p>

            <div className="detail-section">
              <h4>Usage & Treatment</h4>
              <ul className="usage-list">
                {plant.usage.map(u => <li key={u}>{u}</li>)}
              </ul>
            </div>

            <div className="detail-section">
              <h4>Healing Qualities</h4>
              <div className="plant-qualities">
                {plant.qualities.map(q => <span key={q} className="quality">{q}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="about container fade-in">
    <div className="section-header">
      <h2>  About HerboPedia</h2>
    </div>
    <div className="about-content">
      <div className="about-text">
        <p>HerboPedia is a comprehensive digital repository dedicated to the study and preservation of medicinal plant knowledge. Our mission is to bridge the gap between traditional herbal wisdom and modern botanical science.</p>
        <p>Every plant in our collection is carefully documented with its scientific classification, traditional uses, and proven healing qualities. We believe that understanding nature's pharmacy is the first step towards holistic well-being.</p>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Medicinal Plants</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Traditional Uses</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Natural Wisdom</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

function App() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [search, setSearch] = useState("");

  const filteredPlants = plants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
    p.usage.some(u => u.toLowerCase().includes(search.toLowerCase())) ||
    p.qualities.some(q => q.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    // Simple smooth scroll implementation for hash links
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle initial hash on load
    if (window.location.hash) {
      setTimeout(handleHashChange, 500);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />

      <section id="plants" className="plant-explorer container">
        <div className="section-header">
          <div>
            <h2>Medicinal Collection</h2>
            {search && <p className="search-count">{filteredPlants.length} plants found for "{search}"</p>}
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by plant, quality, or disease..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredPlants.length > 0 ? (
          <div className="plant-grid">
            {filteredPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} onClick={setSelectedPlant} />
            ))}
          </div>
        ) : (
          <div className="no-results fade-in">
            <p>No plants found matching your search. Try another term or explore our full collection.</p>
            <button className="btn-primary" onClick={() => setSearch("")}>Clear Search</button>
          </div>
        )}
      </section>

      <About />

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 HerboPedia - Medicinal Plant Database</p>
          <p>Harnessing the power of nature for holistic health.</p>
        </div>
      </footer>

      {selectedPlant && <PlantModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />}
    </div>
  );
}

export default App;
