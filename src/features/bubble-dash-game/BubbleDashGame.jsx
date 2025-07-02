import { useNavigate } from "react-router-dom";
import ActivityBar from "../../components/ActivityBar";
import "./BubbleDashGame.scss";
import { useState, useEffect } from "react";

export default function BubbleDashGame() {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/home");
  };

  let stack = 0;
  const [playerState, setPlayerState] = useState([2, 2]);
  const [worldX, setWorldX] = useState(0);
  let yLimit = 9999;
  let worldW = 0;
  let worldH = 0;

  const [gameStarted, setGameStarted] = useState(false);

  window.addEventListener("keydown", (ev) => {
    if (ev.code === "Space") {
      stack += 40;
    }
  });



  const checkCol = () => {
    const worldW = document.getElementById('stage').getBoundingClientRect().width;
    const worldH = document.getElementById('stage').getBoundingClientRect().height;
    
    console.dir('worldW', worldW);
    if (!gameStarted || !worldW) {
        return;
    }
    let gameOver = false;
    // top pencils
    console.dir('worldW' + worldW);
    console.dir('worldX' + worldX);
    let pencil1 = {
        x:worldW - worldX + 52,
        y:70,
        width:55,
        height:240
    }

    let pencil2 = {
    x:worldW - worldX + 52,
    y:worldH-240,
    width:55,
    height:240
}

    let pencil3 = {
    x:worldW - worldX + 52,
    y:70,
    width:55,
    height:240
}

    let pencil4 = {
    x:worldW - worldX + 52,
    y:worldH-240,
    width:55,
    height:240
}

    if ((playerState[0] + 88 > pencil1.x && playerState[0] < pencil1.x + pencil1.width) && (playerState[1] < pencil1.height)) {
        gameOver = true;
    }
    else if ((playerState[0] + 88 > pencil3.x && playerState[0] < pencil3.x + pencil3.width) && (playerState[1] < pencil3.height)) {
        gameOver = true;
    }
    else if ((playerState[0] + 88 > pencil2.x && playerState[0] < pencil2.x + pencil2.width) && (playerState[1] < pencil2.y)) {
        gameOver = true;
    }
     else if ((playerState[0] + 88 > pencil4.x && playerState[0] < pencil4.x + pencil4.width) && (playerState[1] < pencil4.y)) {
        gameOver = true;
    }

    if (gameOver) {
        setGameStarted(false);
    }
  }

  useEffect(() => {
    if (!gameStarted) {
        return;
    }
    const interval = setInterval(() => {
        setWorldX(worldX + 5);

        if (worldX > 1000) {
            setWorldX(0);
        }
        if (stack) {
            setPlayerState([playerState[0], (Math.max(0,playerState[1]) - stack)]);
            stack = 0;
        }
        else {
            setPlayerState([playerState[0], (playerState[1] + 5)]);

            /*
            if (yLimit < playerState[1]) {
                console.dir('t');
                clearInterval(interval);
            }
            */
        }
    }, 40);
  });

  useEffect(() => {
    setInterval(() => checkCol(), 100)
  });

  const startGame = () => {
        setTimeout(() => {
        if(gameStarted) {
            return;
        }
        console.dir('started');
        const rect = document.getElementById("playArea").getBoundingClientRect();

        yLimit = rect.height;
        setPlayerState([rect.width / 2, rect.height / 2]);
        setGameStarted(true);
    }, 1000)

  };

startGame();

  return (
    <div className="bubble-dash-game-wrapper">
      <img
        src="/assets/img/logo.png"
        alt="Bubbloo Logo"
        className="logo upper-left"
      />
      <div className="main-app-wrapper">
        <ActivityBar onClose={() => handleExit()} />
        <div className="main-wrapper">
          <div id="playArea" className="canvas">
            <img
              className="player"
              style={{
                top: playerState[1] + "px",
                left: playerState[0] + "px",
              }}
              src="/assets/img/bubble.svg"
            />
            <div id="stage" className="stage">
                <img id="pencil1" style={{left:`calc(100% - ${worldX}px)`}} src="/assets/img/bubble-dash-game/pencil.svg" />
                <img id="pencil2" style={{left:`calc(100% - ${worldX}px)`}} src="/assets/img/bubble-dash-game/pencil.svg" />
                <img id="pencil3" style={{left:`calc(100% - ${worldX}px)`}} src="/assets/img/bubble-dash-game/pencil.svg" />
                <img id="pencil4" style={{left:`calc(100% - ${worldX}px)`}} src="/assets/img/bubble-dash-game/pencil.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
