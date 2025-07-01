import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ActivityBar from "../../components/ActivityBar";
import "./ColouringGame.scss";

export default function ColouringGame() {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/home");
  };

  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [mouse, setMouse] = useState([0,0]);

  const colors = ['#FA8F8F','#FA8FD3','#CF8FFA','#8FCBFA','#8FFAF6','#8FFAB6','#D3FA8F','#F6FA8F','#FAD38F','#FAC18F', '#FFF', '#000']


  window.addEventListener('mousemove', (ev) => {
    const x = ((ev.clientX - window.screen.width/2)/window.screen.width) * 40;
    const y = ((ev.clientY - (window.screen.height *1.5)/2)/window.screen.height) *40;
    setMouse([x,y]);
  })

  const handleClick = (ev) => {
    if (ev.target?.tagName === 'svg') {
        return;
    }
    ev.target.style = 'fill:' + selectedColor;
  }

  return (
    <div className="colouring-game-wrapper">
      <img
        src="/assets/img/logo.png"
        alt="Bubbloo Logo"
        className="logo upper-left"
      />
      <div className="main-app-wrapper">
        <ActivityBar onClose={() => handleExit()} />
        <div className="main-wrapper" >
          <span className="activity-title">Vamos Colorir</span>
          <div className="pic-container" >

            <svg id="Camada_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1920 1080" onClick={(e) => handleClick(e)}>
                <path className="beard" d="M1326.1,480c-54.2,43.1-63,84.1-28.8,142.5-65.8,16.2-88.6,49.8-78.5,116.4-66.6-10.1-100.2,12.7-116.4,78.5-58.4-34.2-99.4-25.5-142.5,28.8-43.1-54.2-84.1-63-142.5-28.8-16.2-65.8-49.8-88.6-116.4-78.5,10.1-66.6-12.7-100.2-78.5-116.4,34.2-58.4,25.5-99.4-28.8-142.5,54.2-43.1,63-84.1,28.8-142.5,65.8-16.2,88.6-49.8,78.5-116.4,66.6,10.1,100.2-12.7,116.4-78.5,58.4,34.2,99.4,25.5,142.5-28.8,43.1,54.2,84.1,63,142.5,28.8,16.2,65.8,49.8,88.6,116.4,78.5-10.1,66.6,12.7,100.2,78.5,116.4-34.2,58.4-25.5,99.4,28.8,142.5Z" style={{fill: '#ffa707'}}/>
                <circle cx="960" cy="480" r="259" style={{fill: '#ffe455'}}/>
                <ellipse cx="1064.7" cy="406.3" rx="47.4" ry="73.7" style={{fill: '#fff'}}/>
                <ellipse cx="867.6" cy="398.3" rx="47.4" ry="73.7" style={{fill: '#fff'}}/>
                <path d="M1053.4,559c20.8,0,34.3,22.1,24.6,40.5-20.3,38.5-64.1,67.5-118,67.5s-102.1-28.4-121-68.6,4.9-39.4,25.2-39.4h189.3Z"/>
                <circle style={{transform:`translateX(min(15px, ${mouse[0]}px)) translateY(${mouse[1]}px)`}}  cx="867.6" cy="427.8" r="29.4"/>
                <circle style={{transform:`translateX(min(15px, ${mouse[0]}px)) translateY(${mouse[1]}px)`}} cx="1064.7" cy="427.8" r="29.4"/>
                <path d="M1032.3,647.2c-7.3-17-28.6-29.2-53.8-29.2s-56.5,18.8-56.5,42,0,1.5,0,2.3c12,3,24.7,4.7,37.9,4.7,27.3,0,52-7.4,72.3-19.7Z" style={{fill: '#ff4545'}}/>
                </svg>

          </div>
        </div>
        <div className="color-palette">
            <div className="color-grid">
                {
                colors.map((color) => {
                    return (
                        <div className="color" style={{backgroundColor:color}} onClick={() => setSelectedColor(color)}></div>
                    )
                })
            }
            </div>
        </div>
      </div>
    </div>
  );
}
