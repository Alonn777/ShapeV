import GraphBodyData from "../components/GraphBodyData.jsx";
import { useBodyData } from "../hooks/useBodyData.jsx";
import { useEffect, useContext, useState } from "react";
import {
  Calendar,
  ArrowLeft,
  TrendingUp,
  Clock10,
  EllipsisVertical,
  Play,
  Moon,
  Flag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionStorage } from "../hooks/SessionStorage";
import { UseWorkouts } from "../hooks/useWorkouts";
import "../css/TrainneLayout.css";
import "../components/GraphBodyData.jsx";

const TrainneLayout = () => {
  // Configuração para determinadas funcionalidades
  const navigate = useNavigate();
  const date = new Date();
  const { bodydataID } = useParams();
  // Requisições e estado de re-renderização
  const { data, getStorageUser, deleteStorage } = SessionStorage();
  const id = data?.user.id;
  const token = data?.token;
  const { WorkoutsList, updateWorkout, refreshWorkouts } = UseWorkouts(
    null,
    id,
    token,
  );
  
  const { BodyData, BodyMeta, BodyHistoricMetric } = useBodyData(bodydataID, token);
  const [WorkoutRender, SetWorkoutRender] = useState([]);
  

  useEffect(() => {
    getStorageUser();
  
  }, []);

  useEffect(() => {
    SetWorkoutRender(WorkoutsList);
  }, [WorkoutsList]);

  const handleExercise = (itemDay) => {
    if (!id) return;
    navigate(`/home/workouts/exercise/${itemDay.id}`, {
      state: { userid: id, bodydataID: bodydataID },
    });
  };
  const BackHome = () => {
    navigate("/home");
  };

  const showRest = (index) => {
    SetWorkoutRender((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            state_render_default: !item.state_render_default,
          };
        }
        return item;
      }),
    );
  };
  const DayOffTrue = async (item) => {
    const dayOff = {
      dayOff: true,
    };
    await updateWorkout(item.id, dayOff, token);
    refreshWorkouts(id, token);
  };
  const dayOffFalse = async (item) => {
    const dayOff = {
      dayOff: false,
    };
    await updateWorkout(item.id, dayOff, token);
    refreshWorkouts(id, token);
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
            <p className="subtitle">Faltam</p>
            <p>{date.getDay()}/6</p>
          </div>
        </div>
        <div className="progress-corporal">
          <div className="progress-icon">
            <TrendingUp size={30} color="#04ff26ff" />
          </div>
          <div className="contente-progress">
            <p className="subtitle">Faltam</p>
            {BodyMeta && BodyData ? (
              <p className="meta-kg">
                {Math.abs(BodyData[0].weight - BodyMeta[0].weight_meta).toFixed(
                  2,
                )}
                KG
              </p>
            ) : (
              <p className="meta-kg">0 KG</p>
            )}
          </div>
        </div>
        <div className="time-week-trainning">
          <div className="time-icon">
            <Clock10 size={30} color="#ffa90aff" />
          </div>
          <div className="time-content">
            <p className="subtitle">Tempo de treino</p>
            <p>4h 30m</p>
          </div>
        </div>
      </div>

      <div className="workouts-main">
        <section className="workout-week">
          <div className="header-workout">
            <Calendar size={30} color="#2da0ffff" />
            <h2>Rotina Semanal</h2>
          </div>

          <div className="workout-box">
            <div className="workout-days">
              {WorkoutRender && WorkoutRender.length > 0 ? (
                WorkoutRender.map((item, index) => {
                  const isRestDay = item.state_render_default;

                  if (item.dayOff === true) {
                    return (
                      <div className="workout-box" key={item.id}>
                        <div className="workout rest">
                          <div className="day-description">
                            <div className="icon">
                              <Moon color="#ffb005" />
                            </div>
                            <div className="description">
                              <h4>{item.day}</h4>
                              <p>Descanso</p>
                            </div>
                          </div>

                          <div className="start-trainning">
                            <button className="button-blocked">-</button>

                            <button
                              onClick={() => showRest(index)}
                              className="btn-ellipsis"
                            >
                              <EllipsisVertical color="#fff" />
                            </button>
                          </div>
                        </div>

                        {/* Botão para marcar como descanso*/}
                        {isRestDay && (
                          <div className="rest-day-action">
                            <button
                              className="btn-rest"
                              onClick={() => dayOffFalse(item)}
                            >
                              Remover descanso
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className="workout-box" key={item.id}>
                      <div className="workout">
                        <div className="day-description">
                          <div className="icon">
                            <Play color="#2bc3ff" />
                          </div>
                          <div className="description">
                            <h4>{item.day}</h4>
                            {item.workout ? (
                              <p>{item.workout}</p>
                            ) : (
                              <p>Treino indefinido</p>
                            )}
                          </div>
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

                          <button
                            onClick={() => showRest(index, item)}
                            className="btn-ellipsis"
                          >
                            <EllipsisVertical color="#fff" />
                          </button>
                        </div>
                      </div>

                      {/* Botão para marcar como descanso*/}
                      {isRestDay && (
                        <div className="rest-day-action">
                          <button
                            className="btn-rest"
                            onClick={() => DayOffTrue(item)}
                          >
                            Marcar como descanso
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
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
          <div className="bodydata-graph">
            <div className="body-progress">
              <div className="weight-now">
                <p>Peso atual:</p>
                {BodyData === null || BodyData.length < 1 ? (
                  <p className="weight-info">0 kg</p>
                ) : (
                  <p className="weight-info"> {BodyData[0].weight} kg </p>
                )}
              </div>

              <div className="weight-now">
                <p>Meta corporal:</p>
                {BodyMeta === null || BodyMeta.length < 1 ? (
                  <p className="meta-info">0 kg</p>
                ) : (
                  <p className="meta-info">{BodyMeta[0].weight_meta} kg </p>
                )}
              </div>
            </div>
            {BodyHistoricMetric === null || BodyHistoricMetric.length < 1 ? (
              <p>Sem dados corporais para analisar!</p>
            ) : (
              <GraphBodyData graphData={BodyHistoricMetric} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrainneLayout;
