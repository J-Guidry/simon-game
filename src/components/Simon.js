import React from "react";
import Title from "./Title";
import ScoreBox from "./ScoreBox";
import StartBtn from "./StartBtn";
import { model } from "../data/model";
import Colors from "./Colors";
import update from "immutability-helper";

const dataModel = model;

export default class Simon extends React.Component {
    constructor(props){
        super(props);
        this.turnOn = this.turnOn.bind(this);
        this.startGame = this.startGame.bind(this);
        this.playSequence = this.playSequence.bind(this);
        this.toggleColor = this.toggleColor.bind(this);
        this.addRandomColorToSequence = this.addRandomColorToSequence.bind(this);
        this.increaseTurnCount = this.increaseTurnCount.bind(this);
        this.toggleClickable = this.toggleClickable.bind(this);
        this.state = {
            start: false,
            turnCount: 0,
            compSequence: [],
            class: ["red", "blue", "yellow", "green"],
            clickable: false
        }
    }

    turnOn () {
        if(this.state.start === true){
            this.setState({start: !this.state.start,
                           turnCount: this.state.turnCount = 0,
                           compSequence: this.state.compSequence = [],
                           class: ["red", "blue", "yellow", "green"],
                           clickable: false
                           });
          } else if(this.state.start === false){
            this.setState({start: !this.state.start});
            this.startGame();
          }
    }

    startGame() {
       this.addRandomColorToSequence();
       this.increaseTurnCount();
       this.playSequence(); 
    }

    addRandomColorToSequence(){
        let randomColor;
        randomColor = dataModel.colors[dataModel.chooseRandomColor()];
        this.setState({compSequence: update(this.state.compSequence, {$push: [randomColor]})});
    }

    increaseTurnCount(){
        this.setState({turnCount: this.state.turnCount + 1});
    }

    toggleClickable(){
        this.setState({ clickable: this.state.clickable = !this.state.clickable});
    }
    playSequence() {
        let i = 0;
        let sequence = setInterval(()=>{
            this.toggleColor(this.state.compSequence[i]);
            i++;
            if(i >= this.state.compSequence.length){
                clearInterval(sequence);    
            }
        }, 1000);
        if(this.state.clickable === false){
            this.toggleClickable();
        }
    }

    toggleColor(btnClass){
        this.setState({
            class: update(this.state.class, 
            {$splice: [[this.state.class.indexOf(btnClass), 1, `${btnClass}Highlight`]]})
        });
        
        dataModel.sounds[btnClass].play();

       setTimeout(()=>{
            this.setState({
                class: update(this.state.class, 
                {$splice: [[this.state.class.indexOf(`${btnClass}Highlight`), 1, btnClass]]})
            });
        }, 500);
    }

    render(){
        return (
            <div id="game">
                <Colors clickable={this.state.clickable} toggleColor={this.toggleColor} class={this.state.class} 
                    compSequence={this.state.compSequence} turnCount={this.state.turnCount} 
                    playSequence={this.playSequence} addToSequence={this.addRandomColorToSequence}
                    increaseTurnCount={this.increaseTurnCount} toggleClickable={this.toggleClickable}
                    sequencePlayed={this.state.sequencePlayed}/>
                <div id="innerControls">
                    <Title />
                    <ScoreBox turnCount={this.state.turnCount} start={this.state.start}/>
                    <StartBtn onClick={this.turnOn}/>
                </div>
            </div>            
        )
    }
}

