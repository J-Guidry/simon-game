
 
 export const model = {
    strict: false,
    colors: ["red", "blue", "green", "yellow"],
    chooseRandomColor: function() {
      return Math.floor(Math.random() * this.colors.length); 
    },
    sounds:{blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
            red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
            yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
            green: new  Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")}
  }