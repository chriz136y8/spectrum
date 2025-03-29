const Gallery = ({ images }) => {
    return (
      <div className="gallery-container">
        
        <div className="image-container">
          {images && images.length > 0 ? (
            images.map((pic, index) => (
              <div className="gallery-item" key={index}>
                <img
                  className="gallery-screenshot"
                  src={pic}
                  alt={`Seen Artwork ${index + 1}`}
                  width="100"
                />
              </div>
            ))
          ) : (
            <p className="seen-text">You haven't seen any art yet!</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Gallery;
  