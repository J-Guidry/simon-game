import React from "react";

export default class Colors extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            playerInputCount: 0
        }
    }

    onClick(e) {
        
        if(this.props.clickable === true){
            e.preventDefault();
            //console.log("toggled false from click");
            this.props.toggleClickable();
            this.props.toggleColor(e.target.className);
            this.checkUserInput(e.target.className);
        }
    }

    resetPlayerInputCount(){
        this.setState({playerInputCount: 0});
    }

    checkUserInput(inputtedColor){
        let expectedColor = this.props.compSequence[this.state.playerInputCount];

        if(expectedColor === inputtedColor){
          this.setState({playerInputCount: this.state.playerInputCount = this.state.playerInputCount + 1});
          this.isTurnOver();

        } else {
            this.mismatch();            
        }
        // if(this.props.clickable === false){
            //  this.props.toggleClickable();
        // }

    }

    isTurnOver(){
        let allCorrect = this.props.compSequence.length === this.state.playerInputCount;
        console.log(`all correct? ${allCorrect}`);
        if(this.props.clickable === false || this.state.playerInputCount > 0){
            this.props.toggleClickable();
        }
        if(allCorrect === true){
            this.resetPlayerInputCount();
            this.nextOne();
        }
    }

    nextOne(){
        if(this.props.turnCount === 20){
            this.youWon();
        } else {
            this.props.increaseTurnCount();
            this.props.addToSequence();
            this.props.playSequence();
        }
    }

    mismatch(){
        //play sound for mismatch
        console.log("try again");
        this.resetPlayerInputCount();
        this.props.playSequence();
    }

    youWon(){
        //flashing font in scorebox
    }

    render(){
        return (
            <div>
                <div className={this.props.class[0]} onClick={this.onClick}></div>
                <div className={this.props.class[1]} onClick={this.onClick}></div>
                <div className={this.props.class[2]} onClick={this.onClick}></div>
                <div className={this.props.class[3]} onClick={this.onClick}></div>
            </div>
        )
    }
}