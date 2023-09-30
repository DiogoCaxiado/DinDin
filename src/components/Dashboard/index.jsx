import Resume from "../Resume";
import Button from "../Button";
import Table from "../Table";

import "./style.scss";
import { useState } from "react";
import Filter from "../FilterButton";
import FilterSection from "../FilterSection";

export default function Dashboard({
  credit,
  debit,
  updateSubmit,
  moreRecents,
  setUpdateSubmit,
  setAddRegister,
  setEditRegister,
  setMoreRecents,
  filters,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [registers, setRegisters] = useState([]);

  return (
    <div className="dashboard">
      <div className="position__left">
        <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

        {filterOpen && (
          <div className="position__filterOpen">
            <FilterSection
              filters={filters}
              registers={registers}
              setRegisters={setRegisters}
              updateSubmit={updateSubmit}
              setUpdateSubmit={setUpdateSubmit}
            />
          </div>
        )}

        <Table
          setEditRegister={setEditRegister}
          updateSubmit={updateSubmit}
          moreRecents={moreRecents}
          setUpdateSubmit={setUpdateSubmit}
          setMoreRecents={setMoreRecents}
          registers={registers}
          setRegisters={setRegisters}
        />
      </div>

      <div className="position__resume">
        <Resume credit={credit} debit={debit} />
        <Button
          name={"Adicionar Registro"}
          click={() => setAddRegister(true)}
        />
      </div>
    </div>
  );
}
