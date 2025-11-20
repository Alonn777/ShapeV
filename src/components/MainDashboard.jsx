import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple } from "lucide-react";
import { SessionStorage } from "../hooks/SessionStorage";
import "../css/MainDashboard.css";
import { useEffect } from "react";
const MainDashboard = () => {
  const navigate = useNavigate();
  const { data: id, getStorageUser } = SessionStorage();

  useEffect(() => {
    getStorageUser();
  }, []);

  const HandleExercise = () => {
    navigate("/home/workouts");
  };
  const HandleDiet = () => {
    navigate(`/home/diets/${id}`);
  };
  return (
    <div className="main-dashboard">
      <div className="title-main">
        <h2>Seja bem-vindo ao ShapeV</h2>
        <p>Explore as nossas prinicpais funcionalidades abaixo</p>
      </div>

      <div className="action-card">
        <div className="card-section" onClick={HandleExercise}>
          <Dumbbell />
          <h4>Treino</h4>
          <p>Gerencie sua rotina de exercícios e acompanhe seu progresso</p>
          <span>Acessar</span>
        </div>
        <div className="card-section" onClick={HandleDiet}>
          <Apple />
          <h4>Dieta</h4>
          <p>Controle sua alimentação e sua hidratação diaria</p>
          <span>Acessar</span>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
