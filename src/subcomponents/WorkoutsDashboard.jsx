import { ArrowLeft, Pencil, Save, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UsePost } from "../hooks/usePost.jsx";
import { UseGet } from "../hooks/useGet.jsx";
import { UsePut } from "../hooks/usePut.jsx";
import HeaderMain from "../components/HeaderMain.jsx";
import "./WorkoutsDashboard.css";

const WorkoutsDashboard = () => {
  // definição dos identificadores/URL
  const { id } = useParams();
  const location = useLocation();

  const { userid } = location.state;
  const url = `http://localhost:3000/app/users/${userid}/exercises/${id}`;

  // Hooks de requisição
  const { httpConfig } = UsePost(url);
  const { Exercise: ExerciseServer, Workout } = UseGet(
    `http://localhost:3000/app/users/${userid}`,
    id
  );
  const {UpdateExercise} = UsePut() 
  const navigate = useNavigate();

  // Salvando dados vindo do servidor 
  useEffect(()=>{
    if(ExerciseServer){
      SetExercise(ExerciseServer)
    }
  }, [ExerciseServer])
  // ESTADOS DA APLICAÇÃO
  const [isDayExercise, SetDayExercise] = useState(null);
  const [SaveExercise, SetSave] = useState(false);
  const [exercises, SetExercise] = useState([])

  // Botão de voltar
  const Back = () => {
    navigate("/home/workouts");
  };

  // função para criar novo exercicio
  const createExercise = () => {
    const exerciseCard = {
      name: "Novo Exercício",
      series: 3,
      reps: 12,
      weight: "0kg",
      time: "60s",
    };
    httpConfig(exerciseCard, "POST");
  };

  // controled form
  const HandleChange = (id, name, value)=>{
    SetExercise((PrevExercise)=>
      PrevExercise.map((ex)=>
        ex.id === id ? {...ex, [name]: value} : ex
      )
    )
  }
  const SubmitExercise = (e, ExID) => {
    e.preventDefault();
  
    const ExerciseItem = exercises.find((ex)=> ex.id === ExID)
    UpdateExercise(`http://localhost:3000/app/users/${userid}/exercises/${id}/${ExID}`, ExerciseItem)

  };
console.log(exercises)
  return (
    <div className="WorkoutDay-dashboard">
      <div className="header-workout-day">
        <div className="back-box">
          <button className="btn-back" onClick={Back}>
            <ArrowLeft color="#f5f5f5f5" /> <span>Voltar</span>
          </button>
        </div>

        <div className="workout-day-content">
          {isDayExercise ? (
            <div className="workout-day-save">
              <div className="control-content">
                <h2></h2>
                <p></p>
              </div>
              <button type="button">
                <Pencil />
              </button>
            </div>
          ) : (
            <form>
              <div className="control-content">
                <input
                  type="text"
                  placeholder="Digite o nome do treino"
                  id="day-exercise"
                ></input>
                {Workout && <p>{Workout.day}</p>}
              </div>
              <button type="submit">
                <Save color="#1bff14ff" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="exercise-container">
        <div className="exercise-box">
          {
          exercises && exercises.length > 0 ? 
          exercises.map((exercise) => (
            <div className="exercise-card" key={exercise.id}>
              <div className="exercise-content">
                {SaveExercise ? (
                  <div>
                    <h2>Teste</h2>
                  </div>
                ) : (
                  <form onSubmit={(e) => SubmitExercise(e, exercise.id)}>
                    <div className="form-control-header">
                      <div className="inputs-box">
                        <input type="checkbox"/>
                        <input
                          type="text"
                          placeholder="Digite o nome do seu exercício"
                          value={exercise.name || ""}
                          onChange={(e) => HandleChange(exercise.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="actions">
                        <button type="submit">
                          <Save color="#1bff14ff" />
                        </button>
                        <button type="button">
                          <Trash />
                        </button>
                      </div>
                    </div>

                    <div className="infos">
                      <div className="control-infos">
                        <label htmlFor="series">Séries:</label>
                        <input
                          type="number"
                          value={exercise.series || ""}
                          onChange={(e) => HandleChange(exercise.id, "series", e.target.value)}
                        />
                      </div>

                      <div className="control-infos">
                        <label htmlFor="Reps">Reps:</label>
                        <input
                          type="number"
                          value={exercise.reps || ""}
                          onChange={(e) => HandleChange(exercise.id, "reps", e.target.value)}
                        />
                      </div>

                      <div className="control-infos">
                        <label htmlFor="Peso">Peso:</label>
                        <input
                          type="text"
                          value={exercise.weight || ""}
                          onChange={(e) => HandleChange(exercise.id, "weight", e.target.value)}
                        />
                      </div>

                      <div className="control-infos">
                        <label htmlFor="Descanso">Descanso:</label>
                        <input
                          type="text"
                          value={exercise.time || ""}
                          onChange={(e) => HandleChange(exercise.id, "time", e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))
        : <p>Carregando...</p>
        }
        </div>
      </div>

      <button type="button" onClick={createExercise}>
        <span>
          <Plus /> Adcionar exercicío
        </span>
      </button>
    </div>
  );
};

export default WorkoutsDashboard;
