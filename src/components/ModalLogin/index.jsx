import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../data/users";

import { setItem } from "../../utils/storage";

import "./../../global.scss";
import "./style.scss";

export default function ModalLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = form;

    try {
      if (!email || !password) {
        return;
      }

      const userFind = users.find((user) => {
        return user.email === email;
      });

      if (!userFind) {
        return;
      }

      if (userFind.password === password) {
        navigate("/main");
        setItem("token", userFind.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeInput(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <form className="modal__login" onSubmit={handleSubmit}>
      <h3 className="form__title">Login</h3>

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
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleChangeInput}
        required
      />

      <button type="submit" className="form__button">
        Entrar
      </button>
    </form>
  );
}
