import "../css/MainDashboard.css";
import { BodyDataContext } from "../context/BodyDataContext";
import { UseGetDiet } from "../hooks/useGetDiet";
import { UseGet } from "../hooks/useGet";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple, Activity } from "lucide-react";
import { SessionStorage } from "../hooks/SessionStorage";
import { useEffect, useState, useContext } from "react";

const MainDashboard = () => {
  const navigate = useNavigate();
  const { data, getStorageUser } = SessionStorage();
  const id = data?.user.id;
  const token = data?.token;
  const { DietCredential, BodyDataCredential } = UseGet(id, token);
  const { SetBodyDataID } = useContext(BodyDataContext);
  useEffect(() => {
    getStorageUser();
  }, []);

  const HandleExercise = () => {
    if (!BodyDataCredential.id)
      return "[ERROR]: O ID do gráfico corporal não existe";

    navigate(`/home/workouts/${BodyDataCredential.id}`);
  };
  const HandleDiet = () => {
    if (!DietCredential.id) {
      console.log("Aguardando ID do usuário...");
      return;
    }

    navigate(`/home/diets/${DietCredential.id}`);
  };

  const handleBodyData = () => {
    if (!BodyDataCredential.id) {
      console.log("Aguardando ID do usuário...");
      return;
    }
    navigate(`/home/bodydata/${BodyDataCredential.id}`);
  };
  return (
    <div className="main-dashboard">
      <div className="title-main">
        <h2>Seja bem-vindo ao ShapeV</h2>
        <p>Explore as nossas prinicpais funcionalidades abaixo</p>
      </div>

      <div className="action-card">
        <div className="card-section" onClick={HandleExercise}>
          <div className="icon-dumbbell">
            <Dumbbell size={100} />
          </div>
          <h4>Treino</h4>
          <p>Gerencie sua rotina de exercícios e acompanhe seu progresso</p>
          <p className="enter">Acessar</p>
        </div>
        <div className="card-section" onClick={HandleDiet}>
          <div className="icon-apple">
            <Apple size={100} />
          </div>
          <h4>Dieta</h4>
          <p>Controle sua alimentação e sua hidratação diaria</p>
          <p className="enter">Acessar</p>
        </div>
        <div className="card-section" onClick={handleBodyData}>
          <div className="icon-body">
            <Activity size={100} />
          </div>
          <h4>Dados Corporais</h4>
          <p>Monitore sua evolução fisíca</p>

          <p className="enter">Acessar</p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
