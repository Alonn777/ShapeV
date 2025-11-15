import "../css/DietsLayout.css";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Plus, ArrowLeft } from "lucide-react";
const DietsLayout = () => {
  const navigate = useNavigate();
  const BackHome = () => {
    navigate("/home");
  };

  const date = new Date();
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const DataElement = `${day} de ${monthName}, ${year}`;

  return (
    <div className="Diet-Layout">
      <button type="button" className="home-back" onClick={BackHome}>
        <ArrowLeft /> <span>Voltar para home</span>
      </button>
      <div className="Diet-header">
        <div className="day-box">
          <div className="calendar">
            <Calendar />
          </div>
          <div className="day">
            <h2>Hoje</h2>
            <p>{DataElement}</p>
          </div>
        </div>
        <div className="action-header">
          <button type="button">
            <span>
              <Search />
            </span>
            Buscar alimento
          </button>
          <button type="button">
            <span>
              <Plus />
            </span>
            Nova refeição
          </button>
        </div>
      </div>
      <div className="main-diet">
        <div className="nutrition-datas"></div>
        <h3>Resumo Nutricional</h3>

        <div className="hidatration-container">
          <h3>Hidratação</h3>
        </div>
        <div className="meal-container">
          <h3>Diario de refeições</h3>
        </div>
      </div>
    </div>
  );
};

export default DietsLayout;
