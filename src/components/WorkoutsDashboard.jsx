import { ArrowLeft, Pencil, Save, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UseWorkouts } from "../hooks/useWorkouts.jsx";
import "../css/WorkoutsDashboard.css";

const WorkoutsDashboard = () => {
  // definição dos identificadores/URL
  const { id } = useParams();
  const location = useLocation();
  const { userid } = location.state;
  const exerciseUrl = `http://localhost:3000/users/workouts/exercise/${id}`;
  const navigate = useNavigate();

  // Hooks de requisição
  const {
    Exercise: ExerciseServer,
    Workout: WorkoutList,
    requestWorkout,
    updateExercise,
    updateWorkout,
    createExercise,
    deleteExercise,
    refreshExercises,
  } = UseWorkouts(exerciseUrl, userid);

  // Salvando dados vindo do servidor
  useEffect(() => {
    requestWorkout(`http://localhost:3000/users/workouts/${userid}`);
  }, [userid]);

  useEffect(() => {
    if (ExerciseServer) {
      SetExercise(ExerciseServer);
    }
    if (WorkoutList) {
      const WorkoutCurrent = WorkoutList.find((item) => item.id == id);
      SetWorkout(WorkoutCurrent || {});
    }
  }, [ExerciseServer, WorkoutList, id]);

  // ESTADOS DA APLICAÇÃO
  const [WorkoutPrev, SetWorkout] = useState({});
  const [exercises, SetExercise] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  console.log(WorkoutPrev);
  // Botão de voltar
  const Back = () => {
    navigate("/home/workouts");
  };
  // função para criar novo exercicio
  const handleCreateExercise = async () => {
    const exerciseCard = {
      name: "Novo Exercício",
      series: 3,
      reps: 12,
      weight: "0kg",
      time: "60s",
    };
    await createExercise(exerciseUrl, exerciseCard);
    refreshExercises();
  };
  // Funções de controle de estado
  const HandleChange = (id, name, value) => {
    SetExercise((PrevExercise) =>
      PrevExercise.map((ex) => (ex.id === id ? { ...ex, [name]: value } : ex))
    );
  };

  const WorkoutDayChange = (name, ChangeDay) => {
    SetWorkout((PrevWorkout) => ({
      ...PrevWorkout,
      [name]: ChangeDay,
    }));
  };
  const toggleExerciseCompletion = (exerciseId) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };
  // Manipulação do dia dia do treino
  const UpdateWorkoutDayEX = async (e) => {
    e.preventDefault();
    const WorkoutPatch = {
      workout: WorkoutPrev.workout,
      save: true,
      trainningCreate: WorkoutPrev.trainningCreate,
    };

    await updateWorkout(
      `http://localhost:3000/users/workouts/${id}`,
      WorkoutPatch
    );
     requestWorkout(`http://localhost:3000/users/workouts/${userid}`);

  };
  const EditWorkoutDay = async () => {
    const WorkoutSave = {
      workout: WorkoutPrev.workout,
      save: false,
      trainningCreate: WorkoutPrev.trainningCreate,
    };
    await updateWorkout(
      `http://localhost:3000/users/workouts/${id}`,
      WorkoutSave
    );
   requestWorkout(`http://localhost:3000/users/workouts/${userid}`);
  };

  // Manipulação dos dados de exercicio
  const SaveExercise = async (e, ExID) => {
    e.preventDefault();
    const ExerciseItem = exercises.find((ex) => ex.id === ExID);
    ExerciseItem.save = true;

    await updateExercise(
      `http://localhost:3000/users/workouts/exercise/${ExID}`,
      ExerciseItem
    );
    refreshExercises();
  };

  const EditExercise = async (ExID) => {
    const ExerciseItem = exercises.find((ex) => ex.id === ExID);
    ExerciseItem.save = false;
    await updateExercise(
      `http://localhost:3000/users/workouts/exercise/${ExID}`,
      ExerciseItem
    );
    refreshExercises();
  };

  const handleDeleteExercise = async (ExID) => {
    await deleteExercise(
      `http://localhost:3000/users/workouts/exercise/${ExID}`
    );
    refreshExercises();
  };

  const AllSave = async () => {
    const AllWorkoutSave = {
      workout: WorkoutPrev.workout,
      save: WorkoutPrev.save,
      trainningCreate: true,
    };
    await updateWorkout(
      `http://localhost:3000/users/${userid}/workouts/${WorkoutPrev.id}`,
      AllWorkoutSave
    );
    navigate("/home/workouts");
  };

  // Função para alternar o estado de conclusão do exercício
  return (
    <div className="WorkoutDay-dashboard">
      <div className="header-workout-day">
        <div className="back-box">
          <button className="btn-back" onClick={Back}>
            <ArrowLeft color="#f5f5f5f5" /> <span>Voltar</span>
          </button>
        </div>

        <div className="workout-day-content">
          {WorkoutPrev.save ? (
            <div className="workout-day-save">
              <div className="control-content">
                <h2>{WorkoutPrev.workout}</h2>
                <p>{WorkoutPrev.day}</p>
              </div>
              <button type="button" onClick={EditWorkoutDay}>
                <Pencil color="#f5f5f5" />
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => UpdateWorkoutDayEX(e, WorkoutPrev.id)}>
              <div className="control-content">
                <input
                  type="text"
                  placeholder="Digite o nome do treino"
                  id="day-exercise"
                  value={WorkoutPrev.workout || ""}
                  onChange={(e) => WorkoutDayChange("workout", e.target.value)}
                ></input>
                {<p>{WorkoutPrev.day}</p>}
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
          {exercises && exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div
                className={`exercise-card ${
                  completedExercises.includes(exercise.id) ? "completed" : ""
                }`}
                key={exercise.id}
              >
                <div className="exercise-content">
                  {exercise.save ? (
                    <div className="content">
                      <div className="content-header">
                        <div className="exercise-name">
                          <input
                            type="checkbox"
                            className="checkmark"
                            checked={completedExercises.includes(exercise.id)}
                            onChange={() =>
                              toggleExerciseCompletion(exercise.id)
                            }
                          />
                          <h2>{exercise.name}</h2>
                        </div>
                        <div className="actions">
                          <button
                            type="button"
                            onClick={() => EditExercise(exercise.id)}
                            className="main-action"
                          >
                            <Pencil color="#ffff" />
                          </button>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteExercise(exercise.id)}
                          >
                            <Trash color="#fd0000ff" />
                          </button>
                        </div>
                      </div>
                      <div className="content-infos">
                        <div className="info-box">
                          <label>Series:</label>
                          <div className="info">{exercise.series}</div>
                        </div>
                        <div className="info-box">
                          <label>Reps:</label>
                          <div className="info">{exercise.reps}</div>
                        </div>
                        <div className="info-box">
                          <label>Peso:</label>
                          <div className="info">{exercise.weight}</div>
                        </div>
                        <div className="info-box">
                          <label>Descanso:</label>
                          <div className="info">{exercise.time}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={(e) => SaveExercise(e, exercise.id)}>
                      <div className="form-control-header">
                        <div className="inputs-box">
                          <input
                            type="checkbox"
                            className="checkmark"
                            checked={completedExercises.includes(exercise.id)}
                            onChange={() =>
                              toggleExerciseCompletion(exercise.id)
                            }
                          />
                          <input
                            type="text"
                            placeholder="Digite o nome do seu exercício"
                            value={exercise.name || ""}
                            onChange={(e) =>
                              HandleChange(exercise.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="actions">
                          <button type="submit" className="main-action">
                            <Save color="#1bff14ff" />
                          </button>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteExercise(exercise.id)}
                          >
                            <Trash color="#fd0000ff" />
                          </button>
                        </div>
                      </div>

                      <div className="infos">
                        <div className="control-infos">
                          <label htmlFor="series">Séries:</label>
                          <input
                            type="number"
                            value={exercise.series || ""}
                            className="input-info"
                            onChange={(e) =>
                              HandleChange(
                                exercise.id,
                                "series",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="control-infos">
                          <label htmlFor="Reps">Reps:</label>
                          <input
                            type="number"
                            value={exercise.reps || ""}
                            className="input-info"
                            onChange={(e) =>
                              HandleChange(exercise.id, "reps", e.target.value)
                            }
                          />
                        </div>

                        <div className="control-infos">
                          <label htmlFor="Peso">Peso:</label>
                          <input
                            type="text"
                            value={exercise.weight || ""}
                            className="input-info"
                            onChange={(e) =>
                              HandleChange(
                                exercise.id,
                                "weight",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="control-infos">
                          <label htmlFor="Descanso">Descanso:</label>
                          <input
                            type="text"
                            value={exercise.time || ""}
                            className="input-info"
                            onChange={(e) =>
                              HandleChange(exercise.id, "time", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Ainda não existe exercicios aqui!</p>
          )}
        </div>
        <button
          type="button"
          className="add-exercise"
          onClick={handleCreateExercise}
        >
          <Plus size={30} />
          <span>Adcionar exercicío</span>
        </button>
      </div>
      <div className="footer-buttons">
        <button type="button" className="btn-save-trainning" onClick={AllSave}>
          Salvar e Sair
        </button>
        <button type="button" className="finnish-trainning">
          Finalizar treino
        </button>
      </div>
    </div>
  );
};

export default WorkoutsDashboard;
