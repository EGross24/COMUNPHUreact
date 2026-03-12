import { useState } from "react";

function Home() {

  const [visible, setVisible] = useState(true);

  return (
    <div className="container">

      <h1>Bienvenidos al Sistema de Evaluación Docente</h1>

      {visible && (

        <div className="mensaje-bienvenida">

          <p>
            Bienvenido al sistema de evaluación docente.
            Aquí podrás calificar y dejar comentarios sobre los docentes.
          </p>

          <p>
            Te recordamos que este espacio es para compartir opiniones de forma
            <strong> respetuosa y constructiva</strong>.
          </p>

          <p>
            Evita el uso de lenguaje ofensivo o inapropiado.
          </p>

        </div>

      )}

      <button onClick={() => setVisible(!visible)}>

        {visible ? "Ocultar mensaje" : "Mostrar mensaje"}

      </button>

    </div>
  );
}

export default Home;