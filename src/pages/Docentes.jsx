import { useEffect, useState } from "react";

function Docentes() {
  const [docente, setDocentes] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7139/api/docente")
      .then(response => response.json())
      .then(data => {
        console.log("Datos recibidos:", data);
        setDocentes(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div className="container">
      <h1>Lista de Docentes</h1>

      <div className="docentes-grid">
        {docente.map(docente => (
          <div key={docente.id} className="docente-card">

            <h3>{docente.nombre} {docente.apellido}</h3>

            <p><strong>Título:</strong> {docente.titulo}</p>

            <p><strong>Área:</strong> {docente.area}</p>

            <p><strong>Facultad:</strong> {docente.facultad}</p>

            <p>
              {"⭐".repeat(Math.round(docente.promedio || 0))} 
              ({docente.promedio?.toFixed(1) || "0.0"})
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Docentes;