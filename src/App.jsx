import { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import Banned from "./components/Banned";

const ACCESS_KEY = "DEMO_KEY";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&count=100`;

function App() {
  const [spaceData, setSpaceData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannedItems, setBannedItems] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        
        const filteredData = data.filter(item => 
          item.url && 
          item.media_type === "image" && 
          item.copyright && 
          item.date
        );
        
        // Randomize  order
        const shuffledData = [...filteredData].sort(() => Math.random() - 0.5);
        
        setSpaceData(shuffledData);
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const currentData = spaceData[currentIndex];

 
  const isBanned = (data) => {
    if (!data) return false;
    return (
      bannedItems.includes(data.copyright) || 
      bannedItems.includes(data.date?.substring(0, 4)) || // Year
      bannedItems.includes(data.title)
    );
  };

  // Find next 
  const getNextValidIndex = (startIndex) => {
    let index = startIndex;
    while (index < spaceData.length) {
      if (!isBanned(spaceData[index])) {
        return index;
      }
      index++;
    }
   
    index = 0;
    while (index < startIndex) {
      if (!isBanned(spaceData[index])) {
        return index;
      }
      index++;
    }
    return -1; // All items banned
  };

  
  const handleDiscover = () => {
    if (currentData) {
      setPrevImages(prev => [...prev, currentData.url]);
    }
    
    const nextIndex = getNextValidIndex((currentIndex + 1) % spaceData.length);
    if (nextIndex !== -1) {
      setCurrentIndex(nextIndex);
    }
  };

  
  const handleBan = (value) => {
    if (value && !bannedItems.includes(value)) {
      setBannedItems(prev => [...prev, value]);
      const nextIndex = getNextValidIndex((currentIndex + 1) % spaceData.length);
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex);
      }
    }
  };

  
  const handleUnban = (value) => {
    setBannedItems(prev => prev.filter(item => item !== value));
  };

  return (
    <div className="container">
      <h1 className="heading">🚀 Space Explorer</h1>
      <h5>Discover Amazing Space Images from NASA</h5>

      <div className="app-container">
        <div className="seen">
          <h3>Images Seen So Far</h3>
          <Gallery images={prevImages} />
        </div>

        <div className="art-container">
          {isLoading ? (
            <p>Loading NASA data...</p>
          ) : !currentData ? (
            <p>No more available images! Try removing some bans.</p>
          ) : (
            <div>
              <img
                src={currentData.url}
                alt={currentData.title}
              />
              <h2>{currentData.title}</h2>
              <p className="clickable" onClick={() => handleBan(currentData.copyright)}>
                Photographer: {currentData.copyright || "Unknown"}
              </p>
              <p className="clickable" onClick={() => handleBan(currentData.date?.substring(0, 4))}>
                Year: {currentData.date?.substring(0, 4) || "Unknown"}
              </p>
              <p className="clickable" onClick={() => handleBan(currentData.title)}>
                Title: {currentData.title}
              </p>
              <p className="description">{currentData.explanation?.substring(0, 150)}...</p>

              <button className="discover-btn" onClick={handleDiscover}>
                Discover New Image
              </button>
            </div>
          )}
        </div>

        <div className="banned">
          <h3>Ban List</h3>
          <Banned bannedItems={bannedItems} onRemove={handleUnban} />
        </div>
      </div>
    </div>
  );
}

export default App;