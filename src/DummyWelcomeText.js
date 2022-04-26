import React from "react";
import maniacOrigin from './maniacOrigin.png';
import "./DummyWelcomeText.css";

function DummyWelcomeText(props) {
  return (
    <div className="dummyText">
      <div className="dummyText_container">
        <img src={maniacOrigin} alt="ManiacOrigin" />
        <div className="dummyText_text">
          <h1> WELCOME TO CHAT$MANIA </h1>
        </div>
      </div>
    </div>
  );
}

export default DummyWelcomeText;
