import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="main-app-wrapper">
        <div className="home-wrapper">
        <div className="upper-left-logo">
            <img src="/assets/img/logo.png" />
        </div>
          <div className="left">
            <div className="user-group">
                <img className="avatar" src="/assets/img/avatar-group.png" />
                <span className="username">Miguel Souza</span>
            </div>
            <div className="button-group">
                <div className="exit trans-all hv-light">
                    <img src="/assets/img/icons/exit.svg"/>
                    <span>Sair</span>
                </div>
            </div>
          </div>
          <div className="center">
            <div className="text-group">
                <h2>Olá!</h2>
                <h4>O que vamos fazer agora?</h4>
            </div>

            <div className="activity-group">
                <div className="left-actv">
                    <div className="img-wrapper ">
                        <img src="/assets/img/activity-colouring.png"/>
                    </div>
                    Colorir
                </div>
                <div className="right-actv">
                    <div className="img-wrapper ">
                        <img src="/assets/img/activity-memory.png"/>
                    </div>
                    Memória
                </div>
            </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
  );
}
