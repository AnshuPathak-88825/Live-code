import React, { useEffect, useRef, useState } from "react";
import Client from "../Component/Client";
import Editor from "../Component/Editor";
import { useLocation, useNavigate } from "react-router-dom";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import { toast } from "react-hot-toast";
const EditorPage = () => {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        handleErrors(err);
      });
      socketRef.current.on("connect_failed", (err) => {
        handleErrors(err);
      });
      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed , try again  late.");
        return navigate("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: location.state.roomId,
        Username: location.state.userName,
      });
    };

    if (!location.state) {
      console.log(location);
      return navigate("/");
    }
    init();
  }, []);

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
        <Editor />
      </div>
    </div>
  );
};
export default EditorPage;
