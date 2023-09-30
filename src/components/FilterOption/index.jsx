import IconAdd from "../../assets/Add.svg";
import IconRemove from "../../assets/Remove.svg";

import "./style.scss";

export default function FilterOption({ name, filter, set }) {
  return (
    <div
      className={filter ? "filterOption__selected" : "filterOption"}
      onClick={() => set()}
    >
      <span>{name}</span>
      <img
        src={filter ? IconRemove : IconAdd}
        alt={
          filter
            ? "Ícone de um X que representa o remover do filtro das categorias"
            : "Ícone de um + que representa o adicionar do filtro das categorias"
        }
      />
    </div>
  );
}
