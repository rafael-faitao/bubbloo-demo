import ActivityBar from "../../components/ActivityBar";
import "./MemoryGame.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MemoryGame() {
  const [loaded, setLoaded] = useState(false);


  const [memoryGameCards, setMemoryGameCards] = useState(
    Array.from({ length: 8 }, (_, i) => [
      { id:i, flipped: false, matched: false },
      { id:i, flipped: false , matched: false},
    ]).flat().sort(() => Math.random() - 0.5).map((el, i) => {return {...el, idx:i}})
  );

  const navigate = useNavigate();

  const [matches, setMatches] = useState(0);
  const [lastFlipped, setLastFlipped] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const rightAudio = new Audio('assets/audio/right.mp3');
  const wrongAudio = new Audio('assets/audio/wrong.mp3');
  const winAudio = new Audio('assets/audio/victory.mp3');

    const imageUrls = [
    "/assets/img/memory-game/0.png",
    "/assets/img/memory-game/1.png",
    "/assets/img/memory-game/2.png",
    "/assets/img/memory-game/3.png",
    "/assets/img/memory-game/4.png",
    "/assets/img/memory-game/5.png",
    "/assets/img/memory-game/6.png",
    "/assets/img/memory-game/7.png",
  ];

  const preloadImages = (urls) => {
    const imagePromises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        console.dir('loaded');
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    // Add a timeout promise to ensure loading doesn't hang indefinitely
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    return Promise.all([...imagePromises, timeoutPromise]);
  };

    useEffect(() => {
    preloadImages(imageUrls).then(() => setLoaded(true));
  }, []);


  const handleExit = () => {
    navigate('/home');
  }

  const handleCardClick = (i) => {
    if (isFlipping) {
        return;
    }

    const currentCard = memoryGameCards[i];

    if (currentCard.matched) {
        return;
    }

    if (lastFlipped && lastFlipped.idx !== currentCard.idx) {

        // Its a match
        if (lastFlipped.id === currentCard.id) {
          rightAudio.play();
          setMatches(matches + 1);
            setMemoryGameCards(memoryGameCards.map((card,idx) => {
                return {
                    ...card,
                    flipped: currentCard.id === card.id? true : card.flipped,
                    matched: currentCard.id === card.id? true : card.matched
                }
            }));
            setLastFlipped(null);

            console.dir('matches', matches);
            if (matches === 7) {
              setGameOver(true);
              winAudio.play();
              setTimeout(() => restartGame(), 6000);
            }
        }
        else {
            setIsFlipping(true);
            // its not a match: flip then unflip card
            wrongAudio.play();
            const unflip_idx = lastFlipped.idx;
            setLastFlipped(null);

            setMemoryGameCards(memoryGameCards.map((card,idx) => {
                return {
                    ...card,
                    flipped: i === card.idx? true : card.flipped,
                }
            }));

            setTimeout(() => {
                setIsFlipping(false);
                setMemoryGameCards(memoryGameCards.map((card,idx) => {
                return {
                    ...card,
                    flipped:  [i, unflip_idx].indexOf(card.idx) > -1 ? false : card.flipped
                }
                }));
            }, 1000);
            

            
        }

    }
    else if (!lastFlipped) {
        setLastFlipped(currentCard);
        setMemoryGameCards(memoryGameCards.map((card,idx) => {
            return {
                ...card,
                flipped: idx === i ? true : card.flipped
            }
        }));
    }

  }

  const restartGame = () => {
    setGameOver(false);
    setIsFlipping(false);
    setLastFlipped(null);
    setMemoryGameCards(Array.from({ length: 8 }, (_, i) => [
      { id:i, flipped: false, matched: false },
      { id:i, flipped: false , matched: false},
    ]).flat().sort(() => Math.random() - 0.5).map((el, i) => {return {...el, idx:i}}));
    setMatches(0);
  }
  return (
    <div className="memory-game-wrapper">
      <div className={`victory-burst ${gameOver ? 'animate' : ''}`}>
        <div className="cong-wrapper">
          <img className="congratulations-text" src="/assets/img/congratulations.png"></img>
        </div>
        <div className="radial-container">
          <img className="radial" src="/assets/img/radial.png"></img>
        </div>
      </div>
        <img src="/assets/img/logo.png" alt="Bubbloo Logo" className="logo upper-left" />
      <div className="main-app-wrapper">
        <div className="main-wrapper">
          <ActivityBar onClose={() => handleExit()} />
          <span className="activity-title">Jogo da Memória</span>
{
          (loaded && <div className="memory-game-grid">
            {memoryGameCards.map((card, i) => {
                 
              return card.flipped ? (<div key={i} className={`game-card ${card.matched ? 'match' : ''}`} style={{backgroundImage:`url('/assets/img/memory-game/${card.id}.png')`}} onClick={() => handleCardClick(i)}></div>) : (<div key={i} className="game-card unflipped" onClick={() => handleCardClick(i)}></div>)
            })}
          </div>)}

          {(!loaded && <div className="loading-screen">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#75C6FF" stroke="#75C6FF" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#75C6FF" stroke="#75C6FF" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#75C6FF" stroke="#75C6FF" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </div>)}
        </div>
      </div>
    </div>
  );
}
