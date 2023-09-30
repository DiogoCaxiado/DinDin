import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ModalRegister from "../../components/ModalRegister";
import Logo from "../../components/Logo";
import { getItem } from "../../utils/storage";

import "./style.scss";

export default function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItem("token");

    if (token) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="background__register">
      <div className="logo">
        <Logo />
      </div>
      <div className="modal">
        <ModalRegister />
      </div>
    </div>
  );
}
