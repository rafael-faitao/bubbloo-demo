import React from "react";
import "./AuthPage.scss";

export default function RegisterForm({ onRegisterComplete}) {
  const [fullName, setFullName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState(null);

  const [kidFullName, setKidFullName] = React.useState("");
  const [kidBirthDate, setKidBirthDate] = React.useState("");

  const [step, setStep] = React.useState(1);

    const handleStep1 = (e) => {
    e.preventDefault();
    if (!fullName || !birthDate || !email || !phone || !address)
        return setError("Por favor, preencha todos os campos do responsável legal.");
    setError(null);
    setStep(2);
  };

    const handleStep2 = (e) => {
    e.preventDefault();
    if (!kidFullName || !kidBirthDate)
        return setError("Por favor, preencha todos os campos do infante.");

    setError(null);
    onRegisterComplete();
    }

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if(step === 1) {
      handleStep1(e);
      return;
    }

    if(step === 2) {
      handleStep2(e);
      return;
    }
  };

  return (
    <div className="form-wrapper register-form-wrapper">
      {step === 1 && (
        <div className="wrapper">
          <h4 className="form-title w-100">Dados do Responsável Legal</h4>
          <form className="default-form " onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Data de Nascimento</label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="btn-div">
              <button className="btn" type="submit">
                Avançar
              </button>
            </div>
          </form>
        </div>
      )}
      {step === 2 && (
        <div className="wrapper">
          <h4 className="form-title w-100">Dados do Infante</h4>
          <form className="default-form" onSubmit={handleStep2}>
            <div className="form-group">
              <label htmlFor="fullName">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                value={kidFullName}
                onChange={(e) => setKidFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Data de Nascimento</label>
              <input
                type="date"
                id="birthDate"
                value={kidBirthDate}
                onChange={(e) => setKidBirthDate(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="btn-div">
              <button className="btn" type="submit">
                Avançar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
