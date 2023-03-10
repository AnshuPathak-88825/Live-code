import React from "react";
const Home = () => {
    return (
        <div className="HomePageWrapper">
            <div className="FormWrapper">
                <img className="homePageLogo" src="/code-sync.png" alt="Code-sync-logo" />
                <h4 className="Mainlabel">Paste invitation id</h4>
                <div className="inputGroup">
                    <input type='text' className="inputBox" placeholder="Room-Id"></input>
                    <input type='text' className="inputBox" placeholder="User-Name"></input>
                    <button className="btn joinBtn">Join</button>
                    <span className="createInfo">
                        If you don't have invite then create &nbsp;
                        <a href="/" className="createNewBtn">create room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Home;