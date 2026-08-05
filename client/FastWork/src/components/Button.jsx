export default function Button({
  text,
  onClick,
  color,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: "white",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}