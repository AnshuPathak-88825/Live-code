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
  const roomId = location.state.roomId;
  const codeRef = useRef(null);
  const [clients, setclients] = useState([
    { socketId: 1, username: "Rakesh k" },
    { socketId: 2, username: "Aanshu" },
  ]);
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
        Username: location.state.UserName,
      });
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, Username, socketid }) => {
          if (Username != location.state.UserName) {
            toast.success(`${Username} joined`);
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
              code: codeRef.current,
              socketid: socketid,
            });
          }
          setclients(clients);
        }
      );
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setclients((prev) => {
          return prev.filter((client) => {
            return client.socketId !== socketId;
          });
        });
      });
    };

    if (!location.state) {
      return navigate("/");
    }
    init();
    
  }, []);
  function copyBtn()
  {
    toast.success('Room Id has been copied to you clipboard');
    return navigator.clipboard.writeText(roomId);
  }

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
        <button className="btn copyBtn" onClick={copyBtn}>Copy Room ID</button>
        <a href="/" className="btn leaveBtn">Leave</a>
      </div>
      <div className="editorwrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodechange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};
export default EditorPage;
