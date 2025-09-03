import "./cambiar_contraseña.css";

const Cambiar_contraseña = () => {
  return (
    <div className="cambiar-form">
      <img className="logo-titulo" src="/logo-easyway.png" alt="Logo" />
      <p className="elige-text">Elige una nueva contraseña</p>

      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Nueva contraseña"
        />
      </div>

      <button className="cambiar-button">Cambiar contraseña</button>
    </div>
  );
};

export default Cambiar_contraseña;
