import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { users } from "../../data/users";

import "./../../global.scss";
import "./style.scss";

export default function ModalRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    let { name, email, password, confirmpassword } = form;

    try {
      if (
        !name ||
        !email ||
        !password ||
        !confirmpassword ||
        password !== confirmpassword
      ) {
        return;
      }

      const filterUsers = users.find((user) => {
        return user.email === email;
      });

      if (filterUsers) {
        return;
      }

      const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        registry: [],
      };

      users.push(newUser);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeInput(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <form className="modal__register" onSubmit={handleSubmit}>
      <h3 className="form__title">Cadastre-se</h3>

      <label htmlFor="name" className="form__label">
        Nome
      </label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={handleChangeInput}
        required
      />

      <label htmlFor="email" className="form__label">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleChangeInput}
        required
      />

      <label htmlFor="password" className="form__label">
        Senha
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleChangeInput}
        required
      />

      <label htmlFor="confirm-password" className="form__label">
        Confirmação de senha
      </label>
      <input
        id="confirm-password"
        name="confirmpassword"
        type="password"
        onChange={handleChangeInput}
        required
      />

      <button type="submit" className="form__button">
        Cadastrar
      </button>

      <NavLink to={"/login"}>Já tem cadastro? Clique Aqui!</NavLink>
    </form>
  );
}
