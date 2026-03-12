import { useState, useEffect } from "react";
import SelectorEstrellas from "../components/SelectorEstrellas";

function Calificaciones() {
  const [docentes, setDocentes] = useState([]);
  const [docenteId, setDocenteId] = useState("");
  const [estrellas, setEstrellas] = useState(3);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7139/api/docente")
      .then(res => res.json())
      .then(data => setDocentes(data));
  }, []);

  const enviarCalificacion = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const calificacion = {
      docenteId: parseInt(docenteId),
      estrellas: parseInt(estrellas)
    };

    try {
      const response = await fetch("https://localhost:7139/api/calificacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calificacion)
      });

      if (response.ok) {
        setExito(true);
        setDocenteId("");
        setEstrellas(3);
        setTimeout(() => setExito(false), 3000);
      } else {
        alert("Error al enviar calificación");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container">
      <h1>Calificar Docente</h1>

      <form onSubmit={enviarCalificacion} style={styles.form}>

        <div style={styles.field}>
          <label>Docente</label>
          <select
            value={docenteId}
            onChange={(e) => setDocenteId(e.target.value)}
            required
          >
            <option value="">Seleccione un docente</option>
            {docentes.map(docente => (
              <option key={docente.id} value={docente.id}>
                {docente.nombre} {docente.apellido}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label style={{ textAlign: "center", display: "block" }}>Calificación</label>
          <div style={styles.selectorWrapper}>
            <SelectorEstrellas onChange={setEstrellas} />
          </div>
        </div>

        {exito && (
          <div style={styles.toast}>
            ✓ Calificación enviada correctamente
          </div>
        )}

        <div style={styles.btnWrapper}>
          <button type="submit" disabled={enviando} style={enviando ? { opacity: 0.7 } : {}}>
            {enviando ? "Enviando..." : "Enviar Calificación →"}
          </button>
        </div>

      </form>
    </div>
  );
}

const styles = {
  form: {
    background: "linear-gradient(135deg, #FAFAF8, #F2F0EC)",
    border: "1.5px solid #DDD9D0",
    borderRadius: "12px",
    padding: "28px 32px",
    marginTop: "8px",
  },
  field: {
    marginBottom: "4px",
  },
  selectorWrapper: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  toast: {
    marginTop: "14px",
    padding: "12px 18px",
    background: "linear-gradient(135deg, #EEF6F0, #E4F0EA)",
    border: "1.5px solid #C6DFC8",
    borderRadius: "8px",
    color: "#2D5A36",
    fontWeight: "600",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default Calificaciones;