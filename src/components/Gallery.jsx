const Gallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <div className="image-container">
        {images && images.length > 0 ? (
          images.map((imageUrl, index) => (
            <div className="gallery-item" key={index}>
              <img
                className="gallery-screenshot"
                src={imageUrl}
                alt={`Seen Image ${index + 1}`}
                width="100"
              />
            </div>
          ))
        ) : (
          <p className="seen-text">You haven't discovered any space images yet!</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;