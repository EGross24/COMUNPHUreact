function Tarjeta({ titulo, children }) {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <div style={{ marginTop: "12px" }}>
        {children}
      </div>
    </div>
  );
}

export default Tarjeta;