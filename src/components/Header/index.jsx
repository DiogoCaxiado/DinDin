import { getItem, removeItem } from "../../utils/storage";
import { users } from "../../data/users";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo";
import Account from "../../assets/Account.svg";
import Leave from "../../assets/Leave.svg";

import "./style.scss";

export default function Header({ setEditProfile }) {
  const id = getItem("token");
  const navigate = useNavigate();

  const userLogged = users.find((user) => {
    return user.id === Number(id);
  });
  return (
    <header>
      <Logo />

      <div className="account__menu">
        <img
          className="account__people"
          src={Account}
          alt="Logo do usuário da conta"
          onClick={() => {
            setEditProfile(true);
          }}
        />
        <strong className="account__name">{userLogged.name}</strong>
        <img
          className="account__leave"
          src={Leave}
          alt="ícone para sair da conta"
          onClick={() => {
            removeItem("token");
            navigate("/login");
          }}
        />
      </div>
    </header>
  );
}
