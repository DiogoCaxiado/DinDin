import { useEffect, useState } from "react";
import "./style.scss";

export default function Resume({ credit, debit }) {
  const [sale, setSale] = useState(0);

  useEffect(() => {
    setSale(credit - debit);
  }, [credit, debit]);

  credit /= 100;
  debit /= 100;

  return (
    <div className="resume">
      <h2>Resumo</h2>

      <div className="description">
        <div className="credit">
          <strong className="action">Entradas</strong>
          <span>R$ {credit.toFixed(2).replace(".", ",")}</span>
        </div>

        <div className="debit">
          <strong className="action">Saídas</strong>
          <span>R$ {debit.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>

      <div className="sale">
        <h3>Saldo</h3>
        <span className="price">R$ {sale.toFixed(2).replace(".", ",")}</span>
      </div>
    </div>
  );
}
