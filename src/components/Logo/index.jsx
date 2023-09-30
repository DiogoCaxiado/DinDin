import Icon from "../../assets/Icon.svg";
import "./style.scss";

export default function Logo() {
  return (
    <div className="logo">
      <img src={Icon} alt="ícone" />
      <h2>Dindin</h2>
    </div>
  );
}
