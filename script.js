var gameOnOff = false;
var gameStart = false;
$(document).ready(function() {
  $("[name='onOff-switch']").bootstrapSwitch();
  $("[name='strict-switch']").bootstrapSwitch();
  var randColorArr;
  var clickedColorArr;
  var countMoves;
  var currMoves;
  var i;
  var noOfColors;
  var gameStrict = false;

  $("[name='onOff-switch']").on('switchChange.bootstrapSwitch', function(event, state) {
    if (state === true) {
      gameOnOff = true;
    } else if (state === false) {
      gameOnOff = false;
      gameStart = false;
    }
  });

  $("[name='strict-switch']").on('switchChange.bootstrapSwitch', function(event, state) {
    if (state === true) {
      gameStrict = true;
    } else if (state === false) {
      gameStrict = false;
    }
  });

  $("#startBtn").click(function() {
    if (gameOnOff === true) {
      console.log("yup");
      gameStart = true;
      newGame();
    }
  });

  function newGame() {
    countMoves = 0;
    currMoves = 0;
    randColorArr = [];
    clickedColorArr = [];
    $("#count").html(countMoves);
    newColor();
  }

  // function to add more colors
  function newColor() {
    countMoves = countMoves + 1;
    if (countMoves == 21) {
      console.log("you win");
    } else {
      console.log(countMoves);
      var colorArray = ['red', 'green', 'blue', 'yellow'];
      var randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      randColorArr.push(randColor);
      console.log(randColorArr);
      setColorVar();
    }
  }

  function setColorVar() {
    clickedColorArr = [];
    currMoves = 0;
    i = 0;
    noOfColors = randColorArr.length;
    showColor();
  }
  // function to highlight color
  function showColor() {
    var colorDiv;
    colorDiv = "#" + randColorArr[i];
    var originalColor = $(colorDiv).css("background-color");
    $(colorDiv).css("background-color", "rgba(10, 10, 10, 0.6)");
    playSound(randColorArr[i]);
    setTimeout(function() {
      $(colorDiv).css("background-color", originalColor);
    }, 500);
    i++;
    if (i < noOfColors) {
      setTimeout(showColor, 900);
    }
  }

  function playSound(color) {
    if (gameStart && gameOnOff) {
      var soundUrl;
      if (color == 'red') {
        soundUrl = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
      } else if (color == 'green') {
        soundUrl = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
      } else if (color == 'blue') {
        soundUrl = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
      } else if (color == 'yellow') {
        soundUrl = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
      }
      var audio = new Audio(soundUrl);
      audio.play();
    }
  }
  // take user input
  $(document).on("click", ".gameBox", function(event) {
    var colorDiv;
    if (gameOnOff && gameStart && countMoves <= 20) {
      currMoves = currMoves + 1;
      console.log(event.target.id);
      var clickedColor = event.target.id;
      playSound(clickedColor);
      clickedColorArr.push(clickedColor);
      // console.log(clickedColorArr);
      colorDiv = "#" + clickedColor;
      var originalColor = $(colorDiv).css("background-color");
      $(colorDiv).css("background-color", "rgba(10, 10, 10, 0.6)");
      setTimeout(function() {
        $(colorDiv).css("background-color", originalColor);
      }, 500);
      if (currMoves === countMoves) {
        if (JSON.stringify(clickedColorArr) === JSON.stringify(randColorArr)) {
          console.log("true");
          $("#count").html(countMoves);
          setTimeout(newColor, 900);
        } else if (JSON.stringify(clickedColorArr) !== JSON.stringify(randColorArr)) {
          var originalHtml = $("#score").html();
          $("#score").html("!!!");
          $("#score").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          setTimeout(function() {
          $("#score").html(originalHtml);
        }, 900);  
          if (gameStrict === false) {
            console.log("again");
            setTimeout(setColorVar, 900);
          } else if (gameStrict === true) {
            console.log("game over");
            setTimeout(newGame, 900);
          }
        }
      }
    }
  });
});