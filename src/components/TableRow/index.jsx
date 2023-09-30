import { useState } from "react";
import { format } from "date-fns";

import Edit from "../../assets/Edit.svg";
import Trash from "../../assets/Trash.svg";
import PopupDelete from "../PopupDelete";
import moment from "moment-timezone";

import "./style.scss";

export default function TableRow({
  register,
  registers,
  updateSubmit,
  setRegisters,
  setUpdateSubmit,
  setEditRegister,
}) {
  const [openTrash, setOpenTrash] = useState(false);

  const date = register.date;
  const dateLocal = moment(date).tz("America/New_York").toDate();
  const dateFormat = format(dateLocal, "dd/MM/yy");

  return (
    <tr className="tbody" key={register.idRegister}>
      <td className="data__body">{dateFormat}</td>
      <td>{register.weekDay}</td>
      <td>{register.description ? register.description : "-"}</td>
      <td>{register.category}</td>
      <td className={register.type === "credit" ? "credit" : "debit"}>{`R$ ${(
        register.value / 100
      )
        .toFixed(2)
        .replace(".", ",")}`}</td>
      <td>
        <div className="options">
          <img
            src={Edit}
            onClick={() => setEditRegister(register)}
            alt="Lápis usado para editar o item da tabela"
          />
          <img
            src={Trash}
            onClick={() => setOpenTrash(true)}
            alt="Lixo usado para remover o item da tabela"
          />
          {openTrash && (
            <div className="position__popup">
              <PopupDelete
                register={register}
                registers={registers}
                updateSubmit={updateSubmit}
                setRegisters={setRegisters}
                setUpdateSubmit={setUpdateSubmit}
                setOpenTrash={setOpenTrash}
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
