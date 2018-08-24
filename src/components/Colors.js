import React from "react"

export default class Colors extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            playerInputCount: 0
        }
    }

    onClick(e) {
        if(this.props.start === true){
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
            console.log(this.state.playerInputCount);
          this.setState({playerInputCount: this.state.playerInputCount = this.state.playerInputCount + 1});
          console.log(this.state.playerInputCount);
          this.isTurnOver();
        } else {
            this.resetPlayerInputCount();
            this.props.playSequence();
        }
    }
  
    isTurnOver(){
      let allCorrect = this.props.compSequence.length === this.state.playerInputCount;
      
      if(allCorrect === true){
          this.resetPlayerInputCount();
          this.nextOne();
      }
    }

    nextOne(){
        if(this.props.turnCount === 20){
            this.props.won();
        } else {
            this.props.increaseTurnCount();
            this.props.addToSequence();
            this.props.playSequence();
        }
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