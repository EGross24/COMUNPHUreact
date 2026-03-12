import { useState } from "react";

function Visibilidad() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div>
      <button onClick={() => setMostrar(!mostrar)}>
        {mostrar ? "Ocultar mensaje" : "Mostrar mensaje"}
      </button>

      {mostrar && <p>Este mensaje puede ocultarse y mostrarse.</p>}
    </div>
  );
}

export default Visibilidad;