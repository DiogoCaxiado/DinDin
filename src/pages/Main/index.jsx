import React, { useState, useEffect } from "react";

import Header from "../../components/Header";
import Dashboard from "../../components/Dashboard";
import Register from "../../components/Register";
import Profile from "../../components/Profile";

import { allRegisters } from "../../data/register";
import { getItem } from "../../utils/storage";
import "./style.scss";

export default function Main() {
  const token = getItem("token");

  const [updateSubmit, setUpdateSubmit] = useState(false);
  const [addRegister, setAddRegister] = useState(false);
  const [editRegister, setEditRegister] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [moreRecents, setMoreRecents] = useState(false);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [filters, setFilters] = useState({
    alimentacao: false,
    assinaturasEservicos: false,
    casa: false,
    compras: false,
    cuidadosPessoais: false,
    educacao: false,
  });

  useEffect(() => {
    const userRegisters = allRegisters.filter(
      (register) => register.idUser === Number(token)
    );
    const userCredit = userRegisters
      .filter((register) => register.type === "credit")
      .reduce((total, register) => total + Number(register.value), 0);
    const userDebit = userRegisters
      .filter((register) => register.type === "debit")
      .reduce((total, register) => total + Number(register.value), 0);

    setCredit(userCredit);
    setDebit(userDebit);
  }, [updateSubmit, token]);

  return (
    <div className="main">
      <Header setEditProfile={setEditProfile} />

      <div className="dashboard__background">
        <Dashboard
          credit={credit}
          debit={debit}
          addRegister={addRegister}
          updateSubmit={updateSubmit}
          moreRecents={moreRecents}
          filters={{ value: filters, set: setFilters }}
          setUpdateSubmit={setUpdateSubmit}
          setAddRegister={setAddRegister}
          setEditRegister={setEditRegister}
          setMoreRecents={setMoreRecents}
        />

        {addRegister && (
          <div className="register__add">
            <Register
              title={"Adicionar Registro"}
              updateSubmit={updateSubmit}
              setAddRegister={setAddRegister}
              setUpdateSubmit={setUpdateSubmit}
              setEditRegister={setEditRegister}
              setMoreRecents={setMoreRecents}
            />
          </div>
        )}
      </div>

      {editRegister && (
        <div className="register__edit">
          <Register
            title={"Editar Registro"}
            updateSubmit={updateSubmit}
            editRegister={editRegister}
            setEditRegister={setEditRegister}
            setUpdateSubmit={setUpdateSubmit}
            setMoreRecents={setMoreRecents}
          />
        </div>
      )}

      {editProfile && (
        <div className="profile__edit">
          <Profile setEditProfile={setEditProfile} />
        </div>
      )}
    </div>
  );
}
