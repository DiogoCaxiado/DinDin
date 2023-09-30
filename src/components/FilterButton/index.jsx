import Icon from "../../assets/Filter.png";

import "./style.scss";

export default function FilterButton({ filterOpen, setFilterOpen }) {
  return (
    <div className="filterButton" onClick={() => setFilterOpen(!filterOpen)}>
      <img src={Icon} alt="Ícone do botão de filtrar por categoria" />
      <h3>Filtrar</h3>
    </div>
  );
}
