const Chats = () => {
  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <h2>Chat</h2>
      </div>
      <div className="chatBody">
        <div className="message">
          <span className="username">User1:</span>
          <span className="text">Hello!</span>
        </div>
        <div className="message">
          <span className="username">User2:</span>
          <span className="text">Hi there!</span>
        </div>
      </div>
      <div className="chatInput">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};
export default Chats;
