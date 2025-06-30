import "./MemoryGame.scss";
import { useState } from "react";

export default function MemoryGame() {
  const [memoryGameCards, setMemoryGameCards] = useState(
    Array.from({ length: 8 }, (_, i) => [
      { id:i, flipped: false, matched: false },
      { id:i, flipped: false , matched: false},
    ]).flat().sort(() => Math.random() - 0.5).map((el, i) => {return {...el, idx:i}})
  );



  const [matches, setMatches] = useState(0);
  const [lastFlipped, setLastFlipped] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);


  const handleCardClick = (i) => {
    if (isFlipping) {
        return;
    }

    console.dir('memoryGameCards', memoryGameCards);
    const currentCard = memoryGameCards[i];

    console.dir('currentCard', currentCard)
    console.dir('lastFlipped', lastFlipped);;
    if (currentCard.matched) {
        return;
    }

    if (lastFlipped && lastFlipped.idx !== currentCard.idx) {

        // Its a match
        if (lastFlipped.id === currentCard.id) {
            setMemoryGameCards(memoryGameCards.map((card,idx) => {
                return {
                    ...card,
                    flipped: currentCard.id === card.id? true : card.flipped,
                    matched: currentCard.id === card.id? true : card.matched
                }
            }));
            setLastFlipped(null);
        }
        else {
            setIsFlipping(true);
            // its not a match: flip then unflip card
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

  return (
    <div className="memory-game-wrapper">
      <div className="main-app-wrapper">
        <div className="main-wrapper">
          <span className="activity-title">Jogo da Memória</span>

          <div className="memory-game-grid">
            {memoryGameCards.map((card, i) => {
                 
              return card.flipped ? (<div key={i} className="game-card" style={{backgroundImage:`url('/assets/img/memory-game/${card.id}.png')`}} onClick={() => handleCardClick(i)}></div>) : (<div key={i} className="game-card" onClick={() => handleCardClick(i)}></div>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
