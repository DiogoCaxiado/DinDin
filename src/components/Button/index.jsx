import "./style.scss";

export default function Button({ name, click }) {
  return (
    <button className="default__button" onClick={click}>
      {name}
    </button>
  );
}
