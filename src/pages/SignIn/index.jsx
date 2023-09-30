import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo";
import Login from "../../components/ModalLogin";
import { getItem } from "../../utils/storage";

import "../../global.scss";
import "./style.scss";

export default function ModalLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="background__login">
      <div className="logo">
        <Logo />
      </div>
      <div className="position">
        <div className="position__text">
          <h2>
            Controle suas <span>finanças</span>, sem planilha chata.
          </h2>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
            tem tudo num único lugar e em um clique de distância.
          </p>

          <button onClick={() => navigate("/register")}>Cadastre-se</button>
        </div>
        <Login />
      </div>
    </div>
  );
}
