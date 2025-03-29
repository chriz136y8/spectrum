const Banned = ({ bannedItems }) => {
    return (
      <div className="banned-container">
        
        <div className="banned-list">
          {bannedItems.length > 0 ? (
            bannedItems.map((item, index) => (
              <div className="banned-item" key={index}>
                {item}
              </div>
            ))
          ) : (
            <p>No banned artists or nationalities.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Banned;
  