import { useState, useEffect } from "react";
import { parseISO } from "date-fns";

import Close from "../../assets/Close.svg";
import Button from "../Button";
import { allRegisters } from "../../data/register";
import { getItem } from "../../utils/storage";

import "./style.scss";

export default function Register({
  title,
  editRegister,
  updateSubmit,
  setEditRegister,
  setAddRegister,
  setUpdateSubmit,
  setMoreRecents,
}) {
  const [buttonSelected, setButtonSelected] = useState("debit");
  const [form, setForm] = useState({
    value: "",
    category: "",
    date: "",
    description: "",
  });

  const { value, category, date, description } = form;
  const token = getItem("token");

  useEffect(() => {
    if (title === "Editar Registro") {
      setForm({
        value: editRegister.value,
        category: editRegister.category,
        date: editRegister.date,
        description:
          editRegister.description === "-" ? "" : editRegister.description,
      });

      setButtonSelected(editRegister.type);
    }
  }, []);

  function handleChangeInput(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleCheckRegister() {
    if (title === "Editar Registro") {
      if (buttonSelected !== editRegister.type) {
        return buttonSelected;
      }

      return editRegister.type;
    } else {
      return buttonSelected;
    }
  }

  function handleAddSubmit(event) {
    event.preventDefault();

    try {
      if (!form.value || !form.category || !form.date || !Number(form.value)) {
        return;
      }

      const weekDays = parseISO(date).getDay();

      const daysOfTheWeek = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ];
      const weekDay = daysOfTheWeek[weekDays];

      const verifiyIdRegister = allRegisters.reduce(
        (max, register) =>
          register.idRegister > max ? register.idRegister : max,
        allRegisters[0].idRegister
      );

      const newRegistre = {
        idUser: Number(token),
        idRegister: verifiyIdRegister + 1,
        date,
        weekDay,
        description: description ? description : "-",
        category,
        value,
        type: buttonSelected,
      };

      allRegisters.push(newRegistre);
      setAddRegister(false);
      setUpdateSubmit(!updateSubmit);
      setMoreRecents(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleUpdateSubmit(event) {
    event.preventDefault();

    try {
      if (
        !form.value ||
        !form.category ||
        !form.date ||
        !Number(form.value) ||
        (form.value === editRegister.value &&
          form.category === editRegister.category &&
          form.date === editRegister.date &&
          form.description === editRegister.description &&
          buttonSelected === editRegister.type)
      ) {
        return;
      }

      const weekDays = parseISO(date).getDay();

      const daysOfTheWeek = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ];
      const weekDay = daysOfTheWeek[weekDays];

      const updateRegistre = {
        idUser: Number(token),
        idRegister: editRegister.idRegister,
        date,
        weekDay,
        description: description ? description : "",
        category,
        value,
        type: buttonSelected,
      };

      const findRegistreUpdated = allRegisters.findIndex((register) => {
        return register.idRegister === editRegister.idRegister;
      });

      allRegisters.splice(findRegistreUpdated, 1, updateRegistre);
      setUpdateSubmit(!updateSubmit);
      setEditRegister(false);
      setMoreRecents(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register">
      <div className="register__top">
        <h2>{title}</h2>
        <img
          src={Close}
          alt="botão para fechar o modal"
          onClick={() => {
            title === "Editar Registro"
              ? setEditRegister(false)
              : setAddRegister(false);
          }}
        />
      </div>
      <div className="buttons">
        <button
          className={handleCheckRegister() === "credit" ? "credit" : null}
          onClick={() => setButtonSelected("credit")}
        >
          Entrada
        </button>
        <button
          className={handleCheckRegister() === "debit" ? "debit" : null}
          onClick={() => setButtonSelected("debit")}
        >
          Saída
        </button>
      </div>

      <form
        className="form__register"
        onSubmit={
          title === "Editar Registro" ? handleUpdateSubmit : handleAddSubmit
        }
      >
        <label htmlFor="value">Valor</label>
        <input
          id="value"
          name="value"
          type="text"
          value={form.value}
          onChange={handleChangeInput}
        />

        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChangeInput}
        >
          <option value=""></option>
          <option value="Alimentação">Alimentação</option>
          <option value="Assinaturas e Serviços">Assinaturas e Serviços</option>
          <option value="Casa">Casa</option>
          <option value="Compras">Compras</option>
          <option value="Cuidados pessoais">Cuidados pessoais</option>
          <option value="Educação">Educação</option>
        </select>

        <label htmlFor="data">Data</label>
        <input
          id="data"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChangeInput}
        />

        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChangeInput}
        />

        <div className="button">
          <Button name={"Confirmar"} />
        </div>
      </form>
    </div>
  );
}
