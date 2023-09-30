import { allRegisters } from "../../data/register";

import Polygon from "../../assets/Polygon.svg";

import "./style.scss";

export default function PopupDelete({
  register,
  registers,
  updateSubmit,
  setRegisters,
  setUpdateSubmit,
  setOpenTrash,
}) {
  function handleDeleteRegister(propRegister) {
    const filterDelete = registers.filter((register) => {
      return register.idRegister !== propRegister.idRegister;
    });

    const findDelete = allRegisters.findIndex((register) => {
      return register.idRegister === propRegister.idRegister;
    });

    allRegisters.splice(findDelete, 1);
    setRegisters(filterDelete);
    setUpdateSubmit(!updateSubmit);
  }

  return (
    <div className="popup">
      <img
        className="arrow"
        src={Polygon}
        alt="Seta apontando para a imagem do lixo"
      />

      <span>Apagar Item?</span>

      <div className="container__button">
        <button
          className="button__yes"
          onClick={() => handleDeleteRegister(register)}
        >
          Sim
        </button>
        <button className="button__no" onClick={() => setOpenTrash(false)}>
          Não
        </button>
      </div>
    </div>
  );
}
