import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple } from "lucide-react";
const MainDashboard = () => {
  const navigate = useNavigate();
  const HandleExercise = ()=>{
    navigate('/home/workouts')
  }
  const HandleDiet = ()=>{
   navigate('/home/diets')
  }
  return (
    <div className="main-dashboard">
      <h2>Seja bem-vindo ao ShapeV</h2>
      <p>Explore as funcionalidades abaixo</p>
      <div className="action-buttons">
        <button type="button" onClick={HandleExercise}>
          <Dumbbell /> <span>Gerencie e construa o seu treino</span>
        </button>
        <button type="button" onClick={HandleDiet}>
          <Apple /> <span>Descubra, gerencie e construa a sua dieta!</span>
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
