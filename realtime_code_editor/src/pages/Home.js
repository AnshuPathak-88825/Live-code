import React, { useState } from "react";
import toast from "react-hot-toast";
import {v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate=useNavigate()
    const [roomId,setroomId]=useState('');
    const [UserName,SetUserName]=useState('');
    const createNewRoom=(e)=>{
        e.preventDefault();   
        const id=uuidv4();
        setroomId(id);
        toast.success('Created a new room');
    }
    const joinRoom=()=>
    {
        if(!roomId||!UserName)
        {
            console("Don't have info ");
            return ;
        }
        navigate(`/editor/${roomId}`,{
            state:{
                UserName,roomId
            }
        })

    }
   const handleInputEnter=(e)=>{
    if(e.code ==='Enter')
    {
        joinRoom();
    }

   }
    return (
        <div className="HomePageWrapper">
            
            <div className="FormWrapper">
                <img className="homePageLogo" src="/code-sync.png" alt="Code-sync-logo" />
                <h4 className="Mainlabel">Paste invitation id</h4>
                <div className="inputGroup">
                    <input type='text' value={roomId} onKeyUp={handleInputEnter} onChange={(e)=>setroomId(e.target.value)} className="inputBox" placeholder="Room-Id"></input>
                    <input type='text' value={UserName} onKeyUp={handleInputEnter} onChange={(e)=>SetUserName(e.target.value)} className="inputBox" placeholder="User-Name"></input>
                    <button className="btn joinBtn" onClick={joinRoom}>Join</button>
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