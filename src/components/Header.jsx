import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const links = [
    { to: "/",               label: "Inicio"         },
    { to: "/docentes",       label: "Docentes"       },
    { to: "/evaluaciones",   label: "Evaluaciones"   },
    { to: "/calificaciones", label: "Calificaciones" },
  ];

  return (
    <header>
      {/* Franja verde institucional */}
      <div className="header-top" />

      {/* Logo / nombre del sistema */}
      <div className="header-logo-bar">
        <h2>COMUNPHU</h2>
        <span className="sigla">V 2026.1</span>
      </div>

      {/* Barra de navegación azul */}
      <nav>
        <div className="navbar">
          <ul>
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={location.pathname === to ? "active" : ""}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;