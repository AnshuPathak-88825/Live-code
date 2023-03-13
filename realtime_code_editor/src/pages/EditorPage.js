import React, { useState } from "react";
import Client from "../Component/Client";
import Editor from "../Component/Editor";
const EditorPage = () => {
  const [clients, setclients] = useState([
    { socketId: 1, username: "Rakesh k" },
    { socketId: 2, username: "Aanshu" },
  ]);
  return (
    <div className="minWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className="logoImage"
              src="/code-sync.png"
              alt="Code-sync-logo"
            />
            
          </div>
          <h3>Connected</h3>

          <div className="clientList">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>

      </div>
      <div className="editorwrap">
        <Editor/>
      </div>
    </div>
  );
};
export default EditorPage;
