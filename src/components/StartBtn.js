import React from "react";

const StartBtn = (props) => (
    <div id="start">
        <button id="startBtn" onClick={props.turnOn}></button>
        <div id="startLabel">START</div>
    </div>
 
)

export default StartBtn;