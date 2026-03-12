import { useState } from "react";

function SelectorEstrellas({ onChange }) {
  const [estrellas, setEstrellas] = useState(3);
  const [hovered, setHovered] = useState(null);

  const aumentar = () => {
    if (estrellas < 5) {
      const nuevo = estrellas + 1;
      setEstrellas(nuevo);
      onChange(nuevo);
    }
  };

  const disminuir = () => {
    if (estrellas > 1) {
      const nuevo = estrellas - 1;
      setEstrellas(nuevo);
      onChange(nuevo);
    }
  };

  const seleccionar = (valor) => {
    setEstrellas(valor);
    onChange(valor);
  };

  const labels = ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"];

  return (
    <div style={styles.wrapper}>
      <div style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => seleccionar(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...styles.star,
              color: n <= (hovered ?? estrellas) ? "#E8A838" : "#D8D5CE",
              transform: n <= (hovered ?? estrellas) ? "scale(1.25)" : "scale(1)",
              filter: n <= (hovered ?? estrellas)
                ? "drop-shadow(0 2px 6px rgba(232,168,56,0.55))"
                : "none",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <div style={styles.label}>
        {labels[(hovered ?? estrellas) - 1]}
      </div>

      <div style={styles.controls}>
        <button
          type="button"
          onClick={disminuir}
          disabled={estrellas <= 1}
          style={{
            ...styles.btn,
            opacity: estrellas <= 1 ? 0.35 : 1,
            cursor: estrellas <= 1 ? "not-allowed" : "pointer",
          }}
        >
          −
        </button>

        <span style={styles.count}>{estrellas} / 5</span>

        <button
          type="button"
          onClick={aumentar}
          disabled={estrellas >= 5}
          style={{
            ...styles.btn,
            opacity: estrellas >= 5 ? 0.35 : 1,
            cursor: estrellas >= 5 ? "not-allowed" : "pointer",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "18px 24px",
    background: "linear-gradient(135deg, #FAFAF8 0%, #F2F0EC 100%)",
    borderRadius: "12px",
    border: "1.5px solid #DDD9D0",
    width: "fit-content",
    margin: "8px auto",
    alignSelf: "center",
  },
  starsRow: {
    display: "flex",
    gap: "6px",
  },
  star: {
    fontSize: "32px",
    cursor: "pointer",
    transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1), color 0.18s, filter 0.18s",
    userSelect: "none",
    lineHeight: 1,
  },
  label: {
    fontSize: "0.78rem",
    fontWeight: "600",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#E8A838",
    minHeight: "16px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "2px",
  },
  btn: {
    margin: 0,
    width: "30px",
    height: "30px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    fontWeight: "700",
    borderRadius: "50%",
    background: "white",
    color: "rgb(13,70,112)",
    border: "1.5px solid #DDD9D0",
    boxShadow: "0 2px 6px rgba(11,37,69,0.10)",
    transition: "all 0.18s",
    lineHeight: 1,
  },
  count: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    fontWeight: "600",
    color: "#6B6860",
    minWidth: "34px",
    textAlign: "center",
  },
};

export default SelectorEstrellas;