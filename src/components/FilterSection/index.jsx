import FilterOption from "../FilterOption";

import "./style.scss";

export default function FilterSection({
  filters,
  registers,
  setRegisters,
  updateSubmit,
  setUpdateSubmit,
}) {
  const setFilter = (item) => {
    filters.set({ ...filters.value, ...item });
  };

  const { value } = filters;

  const resetAll = () => {
    const updatedFilters = {};
    for (const key in filters.value) {
      updatedFilters[key] = false;
    }
    filters.set(updatedFilters);
    setUpdateSubmit(!updateSubmit);
  };

  const applyFilters = () => {
    let filterTrue = [];

    for (const i in filters.value) {
      if (filters.value[i] === true) {
        filterTrue.push(i);
      }
    }

    let filtersSelected = [];
    for (const i in filterTrue) {
      const filter = registers.filter((register) => {
        return (
          register.category
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s/g, "") === filterTrue[i].toLowerCase()
        );
      });
      filtersSelected.push(...filter);
    }
    setRegisters(filtersSelected);
  };

  return (
    <div className="filterSection">
      <h4>Categoria</h4>

      <div className="position__options">
        <FilterOption
          name={"Alimentação"}
          filter={value.alimentacao}
          set={() => setFilter({ alimentacao: true })}
        />
        <FilterOption
          name={"Assinaturas e Serviços"}
          filter={value.assinaturasEservicos}
          set={() => setFilter({ assinaturasEservicos: true })}
        />
        <FilterOption
          name={"Casa"}
          filter={value.casa}
          set={() => setFilter({ casa: true })}
        />
        <FilterOption
          name={"Compras"}
          filter={value.compras}
          set={() => setFilter({ compras: true })}
        />
        <FilterOption
          name={"Cuidados pessoais"}
          filter={value.cuidadosPessoais}
          set={() => setFilter({ cuidadosPessoais: true })}
        />
        <FilterOption
          name={"Educação"}
          filter={value.educacao}
          set={() => setFilter({ educacao: true })}
        />
      </div>

      <div className="position__buttons">
        <button className="position__buttons__clear" onClick={() => resetAll()}>
          Limpar Filtros
        </button>
        <button
          className="position__buttons__apply"
          onClick={() => applyFilters()}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}
