import React from "react";
import Title from "./Title";
import ScoreBox from "./ScoreBox";
import StartBtn from "./StartBtn";
import StrictBtn from "./StrictBtn";
import { model } from "../data/model";
import Colors from "./Colors";
import update from "immutability-helper";

const dataModel = model;

export default class Simon extends React.Component {
    constructor(props){
        super(props);
        this.turnOn = this.turnOn.bind(this);
        this.playSequence = this.playSequence.bind(this);
        this.toggleColor = this.toggleColor.bind(this);
        this.addRandomColorToSequence = this.addRandomColorToSequence.bind(this);
        this.increaseTurnCount = this.increaseTurnCount.bind(this);
        this.youWon = this.youWon.bind(this);
        this.itsNotYourTurn = this.itsNotYourTurn.bind(this);
        this.returnIfDisabled = this.returnIfDisabled.bind(this);
        this.state = {
            start: false,
            turnCount: 0,
            strict: false,
            compSequence: [],
            class: ["red", "blue", "yellow", "green"],
            disabledButton: true,
            yourTurn: false
        }
    }

    turnOn () {
        if(this.state.start === true){
            this.setState({start: !this.state.start,
                           turnCount: 0,
                           compSequence: [],
                           class: ["red", "blue", "yellow", "green"],
                           disabledButton: true
                           });
          } else if(this.state.start === false){
            this.setState({start: !this.state.start});
            this.startGame();
          }
    }

    toggleStrict(){
        this.setState(prevState => ({strict: !prevState.strict}));
    }

    startGame() {
       this.addRandomColorToSequence();
       this.increaseTurnCount();
       this.playSequence(); 
       this.itsYourTurn();
    }

    addRandomColorToSequence(){
        let randomColor;
        randomColor = dataModel.colors[dataModel.chooseRandomColor()];
        this.setState({compSequence: update(this.state.compSequence, {$push: [randomColor]})});
    }

    increaseTurnCount(){
        this.setState({turnCount: this.state.turnCount+1});
    }

    playSequence() {
        this.setState({disabledButton: true, yourTurn: false}, ()=>{
            let i = 0;
            let sequence = setInterval(()=>{
                this.toggleColor(this.state.compSequence[i]);
                i++;
                if(i >= this.state.compSequence.length){
                    clearInterval(sequence);
                    this.setState({disabledButton: false, yourTurn: true});    
                }
            }, 1000);
        })

    }

    toggleColor(btnClass){
        this.setState({
            class: update(this.state.class, 
            {$splice: [[this.state.class.indexOf(btnClass), 1, `${btnClass}Highlight`]]}, )
        });
        
        dataModel.sounds[btnClass].play();

       setTimeout(()=>{
            this.setState({
                class: update(this.state.class, 
                {$splice: [[this.state.class.indexOf(`${btnClass}Highlight`), 1, btnClass]]})
            });
        }, 500);

    }

    returnIfDisabled(){
        if(this.state.disabledButton === true ){
            console.log("return");
            return false;
        } else {return true};
    }

    itsYourTurn(){
        this.setState({yourTurn: true});
    }

    itsNotYourTurn(){
        this.setState({yourTurn: false});
    }

    youWon(){
        this.setState({turnCount: "W"});
    }
    
    render(){
        return (
            <div id="game">
                <Colors toggleColor={this.toggleColor} class={this.state.class} 
                    compSequence={this.state.compSequence} turnCount={this.state.turnCount} 
                    playSequence={this.playSequence} addToSequence={this.addRandomColorToSequence}
                    increaseTurnCount={this.increaseTurnCount} start={this.state.start} won={this.youWon}
                    disabled={this.state.disabledButton} yourTurn={this.state.yourTurn} CPUTurn={this.itsNotYourTurn}
                    return={this.returnIfDisabled}/>
                <div id="innerControls">
                    <Title />
                    <div className="container">
                        <ScoreBox turnCount={this.state.turnCount} start={this.state.start}/>
                        <StartBtn onClick={this.turnOn}/>
                        <StrictBtn onClick={this.toggleStrict}/> 
                    </div>
                   
                </div>
            </div>            
        )
    }
}

