import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./AuthPage.scss";
import BubbleBurst from "../../components/BubbleBurst";
import "../../components/Circle.scss";

export default function AuthPage() {
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);
  const [elPool, setElPool] = React.useState({});

  const pop = new Audio('assets/audio/bubble_pop.mp3');

  const [bubbles, setBubbles] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleRegistered = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const handleBubbleClick = (index, ev) => {
    const { x, y } = ev.target.getBoundingClientRect();

    const template = `<svg id="burst-${index}" class="bubble-burst" style="top:${y}px;left:${x}px;">
    <circle class="c-center st0" cx="35.5" cy="34.3" r="4.7">
  </circle>

  <circle class="c-tr st0" cx="52.8" cy="31.7" r="3.3">
  </circle>

  <circle class="c-bl st0" cx="36.5" cy="51.9" r="1.5">
  </circle>

  <circle class="c-br st0" cx="53.9" cy="56.3" r="3.3">
  </circle>

  <circle class="c-center-2 st0" cx="46.9" cy="44.8" r="7.1">
  </circle>`;

    let target = null;

    if (!elPool[index]) {
      const svg = document.createElement("div");
      svg.innerHTML = template;
      document.getElementById("root").appendChild(svg);
      target = document.getElementById("burst-" + index);
      elPool[index] = target;
      setElPool(elPool);
    } else {
      target = elPool[index];
      target.style = `top: ${y}px;left:${x}px`
    }

    setBubbles((prev) => prev.map((b, i) => (i === index ? true : b)));
    pop.play();

    setTimeout(() => {
      target.classList.add("anim");
    }, 10);

    setTimeout(() => {
      setBubbles((prev) => prev.map((b, i) => (i === index ? false : b)));
      target.style = "display:none";
      target.classList.remove("anim");
    }, 1500);
  };

  return (
    <div className="auth-page">
      {showRegisterForm && (
        <img
          src="/assets/img/logo.png"
          alt="Bubbloo Logo"
          className="logo upper-left"
        />
      )}
      {!showLoginForm && !showRegisterForm ? (
        <div className="main-div">
          <img src="/assets/img/logo.png" alt="Bubbloo Logo" className="logo" />
          <button className="btn trans-all hv-light" onClick={handleLogin}>
            Entrar
          </button>
          <p className="new-account">
            Novo por aqui?{" "}
            <a className="trans-all hv-light" href="#" onClick={handleRegister}>
              Criar Conta
            </a>
          </p>
        </div>
      ) : showLoginForm ? (
        <div className="main-div">
          <img src="/assets/img/logo.png" alt="Bubbloo Logo" className="logo" />
          <LoginForm />
        </div>
      ) : (
        <div className="main-div">
          <RegisterForm
            onRegisterComplete={() => {
              handleRegistered();
            }}
          />
        </div>
      )}
      {bubbles.map((_, i) => (
        <div
          id={`bubble-${i}`}
          className={`bubble-container ${bubbles[i] ? "bursting" : ""}`}
          key={`${i}-${bubbles[i] ? "show" : "hide"}`}
          style={{ left: `${i * 400}px` }}
        >
          {bubbles[i] === false && (
            <img
              src="/assets/img/bubble.svg"
              onClick={(ev) => handleBubbleClick(i, ev)}
              key={i}
            />
          )}
        </div>
      ))}
      {
        [1,2,3].map((_,i) => {
          (
            <div className="bubble-container"  style={{ left: `${i * 400}px` }}>
              <img
              className="blurred"
              src="/assets/img/bubble.svg"
              onClick={(ev) => handleBubbleClick(i, ev)}
            />
            </div>
          )
        })
      }
    </div>
  );
}
