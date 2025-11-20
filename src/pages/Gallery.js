import Resource from "../components/Resource";

const Gallery = () => {
  const catURL = "https://api.thecatapi.com/v1/images/search/?limit=15&page=100&order=DESC";
  const dogURL = "https://api.thedogapi.com/v1/images/search/?limit=15&page=100&order=DESC";

  const petNames = ['Zephyr', 'Nimbus', 'Calypso', 'Jinx', 'Orion', 'Echo', 'Tofu', 'Pixel', 'Pippin', 'Quasar',
    'Winston', 'Noodle', 'Bear', 'Biscuit', 'Oakley', 'Chloe', 'Gus', 'Pockets', 'Ziggy', 'Waffles'
  ]

  const render = (data) => {
    if (data.loading) return <p>Loading...</p>;

    return data.trans.map((pet,index) => (
      <div key={pet.id} className="pet-card">
        <div className="pet-image">
          <img className="pet-photo" src={pet.url} alt="pet" />
        </div>
        <div className="pet-info">
          <h3>{petNames[index]}</h3>
        </div>
      </div>
    ));
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Pet Heaven’s Gallery</h1>
        <p>Every pet that has crossed our paths!</p>
      </div>

      {/* Use multiple URLs */}
      <Resource paths={[catURL, dogURL]} render={render} />
    </div>
  );
};

export default Gallery;
