import { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import Banned from "./components/Banned";

const API_URL = "https://api.artic.edu/api/v1/artworks?page=1&limit=100";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannedItems, setBannedItems] = useState([]);
  const [prevArt, setPrevArt] = useState([]);

  const [fields, setFields] = useState({
    title: "",
    artist_title: "",

  });

  // Fetch artworks
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setArtworks(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Get current artwork
  let currentArtwork = artworks[currentIndex];

  // Check if the artwork is from a banned artist or nationality
  while (
    currentArtwork &&
    (bannedItems.includes(currentArtwork.artist_title) ||
      bannedItems.includes(currentArtwork.place_of_origin))
  ) {
    setCurrentIndex((prev) => prev + 1);
    currentArtwork = artworks[currentIndex + 1]; // Skip banned artwork
  }

  // Handle skipping artwork
  const handleSkip = () => {
    setPrevArt((art) => [
      ...art,
      `https://www.artic.edu/iiif/2/${currentArtwork.image_id}/full/843,/0/default.jpg`,
    ]);
    setCurrentIndex((prev) => prev + 1);
  };

  // Handle banning an artist or nationality
  const handleBan = (value) => {
    setBannedItems((prev) => [...new Set([...prev, value])]);
    setCurrentIndex((prev) => prev + 1); // Move to next artwork
  };


  return (
    <div className="container">

      <h1 className="heading">🎨 Museum Explorer</h1>
      <h5>Explore Museum Collection.</h5>

      <div className="app-container">
      
      <div className="seen">
      <h3>Artwork seen so far</h3>
        <Gallery images={prevArt} />
        </div>

        <div className="art-container">
          {currentArtwork ? (
            <div>
              <img
                src={`https://www.artic.edu/iiif/2/${currentArtwork.image_id}/full/843,/0/default.jpg`}
                alt={currentArtwork.title}
              />
              <h2>{currentArtwork.title}</h2>
              <p>by {currentArtwork.artist_title || "Unknown"}</p>
              <p>Nationality: {currentArtwork.place_of_origin || "Unknown"}</p>

              <button onClick={handleSkip}>Next</button>

              {/* Ban Artist & Nationality */}
              {currentArtwork.artist_title && (
                <button onClick={() => handleBan(currentArtwork.artist_title)}>
                  Ban {currentArtwork.artist_title}
                </button>
              )}
              {currentArtwork.place_of_origin && (
                <button onClick={() => handleBan(currentArtwork.place_of_origin)}>
                  Ban {currentArtwork.place_of_origin}
                </button>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      
      <div className="banned">
      
      <h3>Ban List</h3>
          
        <Banned bannedItems={bannedItems} />
      </div>
      

      </div>
    </div>
  );
}

export default App;
