import { useEffect } from "react";
import { allRegisters } from "../../data/register";
import { getItem } from "../../utils/storage";

import ArrowTop from "../../assets/ArrowTop.svg";
import TableRow from "../TableRow";

import "./style.scss";

export default function Table({
  updateSubmit,
  moreRecents,
  registers,
  setEditRegister,
  setUpdateSubmit,
  setMoreRecents,
  setRegisters,
}) {
  const userId = getItem("token");

  useEffect(() => {
    const registerByClient = allRegisters.filter(
      (register) => register.idUser == Number(userId)
    );

    setRegisters([...registerByClient]);
  }, [updateSubmit]);

  function handleMoreRecentDates() {
    if (moreRecents) {
      setMoreRecents(false);
      setUpdateSubmit(!updateSubmit);
    } else {
      const listByMostRecent = registers.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setMoreRecents(listByMostRecent);
    }
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <div
              className="data__header"
              onClick={() => handleMoreRecentDates()}
            >
              Data
              <img src={ArrowTop} alt="arrow" />
            </div>
          </th>

          <th>Dia da semana</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Valor</th>
        </tr>
      </thead>

      <tbody>
        {registers.map((register) => (
          <TableRow
            register={register}
            key={register.idRegister}
            registers={registers}
            updateSubmit={updateSubmit}
            setRegisters={setRegisters}
            setUpdateSubmit={setUpdateSubmit}
            setEditRegister={setEditRegister}
            setMoreRecents={setMoreRecents}
          />
        ))}
      </tbody>
    </table>
  );
}
