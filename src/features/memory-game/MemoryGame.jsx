import ActivityBar from "../../components/ActivityBar";
import "./MemoryGame.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemoryGame() {
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

  const rightAudio = new Audio('assets/audio/right.mp3');
  const wrongAudio = new Audio('assets/audio/wrong.mp3');


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
              setTimeout(() => restartGame(), 3000);
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
        <img src="/assets/img/logo.png" alt="Bubbloo Logo" className="logo upper-left" />
      <div className="main-app-wrapper">
        <div className="main-wrapper">
          <ActivityBar onClose={() => handleExit()} />
          <span className="activity-title">Jogo da Memória</span>

          <div className="memory-game-grid">
            {memoryGameCards.map((card, i) => {
                 
              return card.flipped ? (<div key={i} className={`game-card ${card.matched ? 'match' : ''}`} style={{backgroundImage:`url('/assets/img/memory-game/${card.id}.png')`}} onClick={() => handleCardClick(i)}></div>) : (<div key={i} className="game-card unflipped" onClick={() => handleCardClick(i)}></div>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
