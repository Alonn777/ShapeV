import { useEffect } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Clock10 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SessionStorage } from "../hooks/SessionStorage";
import { UseWorkouts } from "../hooks/useWorkouts";
import "../css/TrainneLayout.css";

const TrainneLayout = () => {
  const navigate = useNavigate();
  const { data: id, getStorageUser } = SessionStorage();

  useEffect(() => {
    getStorageUser();
  }, []);

  const date = new Date();

  const { WorkoutsList } = UseWorkouts(null, id);

  //
  const handleExercise = (itemDay) => {
    if (!id) return console.log("aguardando o id");
    navigate(`/home/workouts/exercise/${itemDay.id}`, {
      state: { userid: id },
    });
  };
  const BackHome = () => {
    navigate("/home");
  };

  return (
    <div className="dashboard-trainnig">
      <button type="button" className="home-back" onClick={BackHome}>
        <ArrowLeft /> <span>Voltar para home</span>
      </button>
      <div className="box-insight-trainning">
        <div className="week-day">
          <div className="calendar-icon">
            <Calendar size={30} color="#2da0ffff" />
          </div>
          <div className="content-week">
            <p>Esta Semana</p>
            <h4>{date.getDay()}/7</h4>
          </div>
        </div>
        <div className="progress-corporal">
          <div className="progress-icon">
            <TrendingUp size={30} color="#04ff26ff" />
          </div>
          <div className="contente-progress">
            <p>Seu progresso</p>
            <h4>33%</h4>
          </div>
        </div>
        <div className="time-week-trainning">
          <div className="time-icon">
            <Clock10 size={30} color="#ffa90aff" />
          </div>
          <div className="time-content">
            <p>Tempo Semana</p>
            <h4>4h 30m</h4>
          </div>
        </div>
      </div>

      <div className="workouts-main">
        <section className="workout-week">
          <div className="header-workout">
            <Calendar size={30} color="#2da0ffff" />
            <h2>Rotina Semanal</h2>
          </div>
          <div className="wokout-box">
            <div className="workout-days">
              {WorkoutsList && WorkoutsList.length > 0 ? (
                WorkoutsList.map((item) => (
                  <div className="workout" key={item.id}>
                    <div className="day-description">
                      <h4>{item.day}</h4>
                      <p></p>
                    </div>
                    <div className="start-trainning">
                      {item.trainningCreate ? (
                        <button
                          className="btn-start-trainning"
                          onClick={() => handleExercise(item)}
                        >
                          Iniciar
                        </button>
                      ) : (
                        <button
                          className="btn-exercise"
                          onClick={() => handleExercise(item)}
                        >
                          Criar
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>Carregando treinos...</p>
              )}
            </div>
          </div>
        </section>
        <section className="box-progress-corporal">
          <div className="corporal-header">
            <TrendingUp size={30} color="#2da0ffff" />
            <h2>Evolução da massa corporal</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrainneLayout;
