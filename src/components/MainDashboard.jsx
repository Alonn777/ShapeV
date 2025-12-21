import "../css/MainDashboard.css";
import { UseGetDiet } from "../hooks/useGetDiet";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple } from "lucide-react";
import { SessionStorage } from "../hooks/SessionStorage";
import { useEffect, useState } from "react";
const MainDashboard = () => {
  const navigate = useNavigate();
  const { data: id, getStorageUser } = SessionStorage();
  
  const dietUrl = id ? `http://localhost:3000/users/diets/${id}` : null;
  const { DietServer } = UseGetDiet(dietUrl, null);

  useEffect(() => {
    getStorageUser();
  }, []);

  const HandleExercise = () => {
    navigate("/home/workouts");
  };
  const HandleDiet = () => {
    // Usa o id do usuário diretamente, garantindo que nunca seja undefined
    if (!id) {
      console.log("Aguardando ID do usuário...");
      return;
    }
    
    // Se DietServer.id existir, usa ele, senão usa o id do usuário
    const dietId = DietServer?.id || id;
    navigate(`/home/diets/${dietId}`);
  };
  console.log
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
