import { useState, useEffect } from "react";

function Evaluaciones() {
  const [docentes, setDocentes] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [docenteId, setDocenteId] = useState("");
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7139/api/docente")
      .then(res => res.json())
      .then(data => setDocentes(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    cargarComentarios();
  }, []);

  const cargarComentarios = () => {
    fetch("https://localhost:7139/api/comentario")
      .then(res => res.json())
      .then(data => setComentarios(data))
      .catch(error => console.error(error));
  };

  const enviarComentario = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const comentario = {
      docenteId: parseInt(docenteId),
      texto: texto
    };
    try {
      const response = await fetch("https://localhost:7139/api/comentario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentario)
      });
      if (response.ok) {
        setExito(true);
        setTexto("");
        setDocenteId("");
        cargarComentarios();
        setTimeout(() => setExito(false), 3000);
      } else {
        alert("Error al enviar comentario");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  const docenteNombre = (id) => {
    const d = docentes.find(d => d.id === id);
    return d ? `${d.nombre} ${d.apellido}` : "Docente";
  };

  return (
    <div className="container">
      <h1>Enviar Evaluación</h1>

      {/* FORMULARIO */}
      <form onSubmit={enviarComentario} style={styles.form}>
        <div style={styles.field}>
          <label>Seleccionar Docente</label>
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
          <label>Comentario</label>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe tu comentario sobre el docente..."
            required
          />
        </div>

        {exito && (
          <div style={styles.toast}>
            ✓ Comentario enviado correctamente
          </div>
        )}

        <div style={styles.btnWrapper}>
          <button type="submit" disabled={enviando} style={enviando ? { opacity: 0.7 } : {}}>
            {enviando ? "Enviando..." : "Enviar Comentario →"}
          </button>
        </div>
      </form>

      {/* DIVIDER */}
      <div style={styles.divider}>
        <span style={styles.dividerLine} />
        <span style={styles.dividerLabel}>
          {comentarios.length} comentario{comentarios.length !== 1 ? "s" : ""}
        </span>
        <span style={styles.dividerLine} />
      </div>

      {/* LISTA DE COMENTARIOS */}
      <h2 style={styles.subtitle}>Comentarios recientes</h2>

      {comentarios.length === 0 ? (
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>💬</span>
          <p>No hay comentarios todavía.</p>
          <small>Sé el primero en evaluar a un docente.</small>
        </div>
      ) : (
        <div style={styles.comentariosList}>
          {comentarios.map((comentario) => (
            <div key={comentario.id} style={styles.comentarioCard}>
              <div style={styles.comentarioHeader}>
                <span style={styles.docenteTag}>
                  👤 {docenteNombre(comentario.docenteId)}
                </span>
                <span style={styles.fecha}>
                  {new Date(comentario.fecha).toLocaleDateString("es-MX", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </span>
              </div>
              <p style={styles.comentarioTexto}>{comentario.texto}</p>
            </div>
          ))}
        </div>
      )}
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
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    margin: "40px 0 24px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#C8DECA",
    display: "block",
  },
  dividerLabel: {
    fontSize: "0.78rem",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#5A7A5A",
    whiteSpace: "nowrap",
  },
  subtitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.3rem",
    color: "rgb(13,70,112)",
    marginBottom: "20px",
  },
  empty: {
    textAlign: "center",
    padding: "48px 20px",
    color: "#5A7A5A",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  emptyIcon: {
    fontSize: "2.5rem",
    marginBottom: "4px",
  },
  comentariosList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  comentarioCard: {
    background: "white",
    border: "1.5px solid #DDD9D0",
    borderRadius: "12px",
    padding: "18px 22px",
    transition: "box-shadow 0.22s, border-color 0.22s",
  },
  comentarioHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  docenteTag: {
    fontWeight: "600",
    fontSize: "0.88rem",
    color: "rgb(13,70,112)",
    background: "rgba(13,70,112,0.08)",
    padding: "4px 12px",
    borderRadius: "20px",
    letterSpacing: "0.02em",
  },
  fecha: {
    fontSize: "0.78rem",
    color: "#5A7A5A",
    whiteSpace: "nowrap",
  },
  comentarioTexto: {
    fontSize: "0.95rem",
    color: "#1A2E1A",
    lineHeight: "1.65",
    margin: 0,
  },
};

export default Evaluaciones;