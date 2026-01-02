import "../css/MainDashboard.css";
import { UseGetDiet } from "../hooks/useGetDiet";
import { UseGet } from "../hooks/useGet";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple, Activity } from "lucide-react";
import { SessionStorage } from "../hooks/SessionStorage";
import { useEffect, useState } from "react";
const MainDashboard = () => {
  const navigate = useNavigate();
  const { data: id, getStorageUser } = SessionStorage();
  
  const {DietCredential, BodyDataCredential} = UseGet(id)
  
  useEffect(() => {
    getStorageUser();
  }, []);

  const HandleExercise = () => {
    navigate("/home/workouts");
  };
  const HandleDiet = () => {
    if (!DietCredential.id) {
      console.log("Aguardando ID do usuário...");
      return;
    }

    
    navigate(`/home/diets/${DietCredential.id}`);
  };

  const handleBodyData = ()=>{
    if(!BodyDataCredential.id){
        console.log("Aguardando ID do usuário...");
      return;
    }
    navigate(`/home/bodydata/${BodyDataCredential.id}`)
  }
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
        <div className="card-section" onClick={handleBodyData}>
          <Activity />
          <h4>Dados Corporais</h4>
          <p>Monitore sua evolução fisíca</p>

          <span>Acessar</span>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
