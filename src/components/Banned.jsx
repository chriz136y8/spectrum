const Banned = ({ bannedItems, onRemove }) => {
  return (
    <div className="banned-container">
      <div className="banned-list">
        {bannedItems.length > 0 ? (
          bannedItems.map((item, index) => (
            <div className="banned-item" key={index}>
              {item.length > 20 ? `${item.substring(0, 17)}...` : item}
              <button onClick={() => onRemove(item)}>×</button>
            </div>
          ))
        ) : (
          <p>No banned attributes yet. Click on an attribute to ban it.</p>
        )}
      </div>
    </div>
  );
};

export default Banned;