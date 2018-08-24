import React from "react";

const ScoreBox = (props) => (
    <div className="container">
        <div id="scoreBox">
            <span>{props.start === false ? "--" : props.turnCount}</span>
        </div>
        <div id="scoreLabel">COUNT</div>
    </div>    
)

export default ScoreBox;

