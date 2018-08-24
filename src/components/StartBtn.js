import React from "react";

const StartBtn = (props) => (

    <div className="container">

        <button id="start" onClick={props.onClick}></button>
        <div id="startLabel">START</div>
    </div>
 
)

export default StartBtn;