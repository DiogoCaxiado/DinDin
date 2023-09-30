import { useEffect, useState } from "react";

import Close from "../../assets/Close.svg";
import Button from "../Button";
import { users } from "../../data/users";
import { getItem } from "../../utils/storage";

import "./style.scss";

export default function Profile({ setEditProfile }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setForm({
      name: name,
      email: email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
  }, []);

  const token = getItem("token");
  const userFind = users.find((user) => user.id === Number(token));
  const { id, name, email, password } = userFind;

  function handleChangeInput(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      form.password !== form.confirmPassword ||
      form.password !== password ||
      form.confirmPassword !== password ||
      (form.name === name &&
        form.email === email &&
        form.password === password &&
        form.confirmPassword === password)
    ) {
      return;
    }

    const findUserUpdated = users.findIndex((user) => user.id === userFind.id);

    const userUpdated = {
      id,
      name: form.name,
      email: form.email,
      password: userFind.password,
    };

    users.splice(findUserUpdated, 1, userUpdated);
    setEditProfile(false);
  }

  return (
    <div className="profile">
      <div className="profile__top">
        <h2>Editar Perfil</h2>
        <img
          src={Close}
          alt="botão para fechar o modal"
          onClick={() => setEditProfile(false)}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChangeInput}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChangeInput}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChangeInput}
          required
        />

        <label htmlFor="confirmPassword">Confirmação da senha</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChangeInput}
          required
        />
        <div className="button">
          <Button name={"Confirmar"} />
        </div>
      </form>
    </div>
  );
}
