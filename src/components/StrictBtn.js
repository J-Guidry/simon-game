import React from "react";

const StrictBtn = (props) => (
    <div id="strict">
        <div id={props.strictLight ? "strictActive" : "strictLight"}></div>
        <button id="strictBtn" onClick={props.toggleStrict}></button>
        <div id="strictLabel">STRICT</div>   
    </div>
)


export default StrictBtn;