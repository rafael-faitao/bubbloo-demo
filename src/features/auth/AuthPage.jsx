import React from 'react';
import LoginForm from './LoginForm';
import './AuthPage.scss';

export default function AuthPage() {

  const [showLoginForm, setShowLoginForm] = React.useState(false);

  const [bubbles, setBubbles] = React.useState([false,false,false,false,false]);

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const handleBubbleClick = (index) => {
  setBubbles(prev =>
    prev.map((b, i) => (i === index ? true : b))
  );
};

  return (
    <div className='auth-page'>
      {!showLoginForm ? (
        <div className="main-div">
        <img src="/assets/img/logo.png" alt="Bubbloo Logo" className="logo" />
        <button className="btn trans-all hv-light" onClick={handleLogin}>Entrar</button>
        <p className='new-account'>Novo por aqui? <a className="trans-all hv-light" href="/register">Criar Conta</a></p>
      </div>
      ) : (
        <LoginForm />
      )}
      {bubbles.map((_, i) => (
        <div className={`bubble-container ${bubbles[i] ? 'bursting' : ''}`} key={`${i}-${bubbles[i] ? 'show' : 'hide'}`} style={{left:`${i*400}px`}}>
        {(bubbles[i] === true) ?
          (<object data="/assets/img/bubble_burst.svg" className='bubble' onClick={() => handleBubbleClick(i)}  />) :  (
          <img src="/assets/img/bubble.svg"   onClick={() => handleBubbleClick(i)} key={i} />
          )}
    </div>
    ))}
    </div>
  )
}