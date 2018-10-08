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
        let block = this.props.return();
        console.log(block);
        if(this.props.start === true && block){
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
          this.setState(prevState => ({playerInputCount: prevState.playerInputCount + 1 }), 
            () => this.isTurnOver());

        } else {
            this.props.CPUTurn();
            this.resetPlayerInputCount();
            this.props.playSequence();
        }
    }
  
    isTurnOver(){
      let allCorrect = this.props.compSequence.length === this.state.playerInputCount;
      if(allCorrect === true){
          console.log("triggered next one");
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
                <button className={this.props.class[0]} onClick={this.onClick}></button>
                <button className={this.props.class[1]} onClick={this.onClick}></button>
                <button className={this.props.class[2]} onClick={this.onClick}></button>
                <button className={this.props.class[3]} onClick={this.onClick}></button>
            </div>
        )
    }
}