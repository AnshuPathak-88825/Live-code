import React, { useState } from "react";

import {v4 as uuidv4 } from "uuid"
const Home = () => {
    const [roomId,setroomId]=useState('');
    const [UserName,SetUserName]=useState('');
    const createNewRoom=(e)=>{
        e.preventDefault();   
        const id=uuidv4();
        setroomId(id);
    }
    return (
        <div className="HomePageWrapper">
            <div className="FormWrapper">
                <img className="homePageLogo" src="/code-sync.png" alt="Code-sync-logo" />
                <h4 className="Mainlabel">Paste invitation id</h4>
                <div className="inputGroup">
                    <input type='text' value={roomId} onChange={(e)=>setroomId(e.target.value)} className="inputBox" placeholder="Room-Id"></input>
                    <input type='text' value={UserName} onChange={(e)=>SetUserName(e.target.value)} className="inputBox" placeholder="User-Name"></input>
                    <button className="btn joinBtn">Join</button>
                    <span className="createInfo">
                        If you don't have invite then create &nbsp;
                        <a onClick={createNewRoom} href="/" className="createNewBtn">create room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Home;