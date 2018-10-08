import React from "react";

const ScoreBox = (props) => (
    <div id="scoreBox">
        <span>{props.start === false ? "--" : props.turnCount}</span>
        <div id="scoreLabel">COUNT</div>
    </div>    
)

export default ScoreBox;

