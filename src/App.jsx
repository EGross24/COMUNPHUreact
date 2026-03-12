import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Docentes from "./pages/Docentes";
import Evaluaciones from "./pages/Evaluaciones";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calificaciones from "./pages/Calificaciones";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docentes" element={<Docentes />} />
        <Route path="/evaluaciones" element={<Evaluaciones />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;