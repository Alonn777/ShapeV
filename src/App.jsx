
import { Link } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div id="App">
      <header>
        <div className="logo">
          <h2>ShapeV</h2>
        </div>
        <div className="login">
          <Link to="/login" className="login-header">
            Logar
          </Link>
        </div>
      </header>
      <main>
        <div className="introduction-section">
          <h1>
            Evolua o seu fisico usando inteligência artificial
            <span>De uma forma inovadora</span>
          </h1>
          <Link to="/login" className="login-button">Conhecer agora!</Link>
        </div>
      </main>
    </div>
  );
}

export default App;
