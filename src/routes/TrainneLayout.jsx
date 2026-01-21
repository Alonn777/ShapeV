import GraphBodyData from "../components/GraphBodyData.jsx";
import { BodyDataContext } from "../context/BodyDataContext.jsx";
import { useBodyData } from "../hooks/useBodyData.jsx";
import { useEffect, useContext, useState } from "react";
import { Calendar, ArrowLeft, TrendingUp, Clock10 } from "lucide-react";
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
  // Requisições
  const { data: id, getStorageUser } = SessionStorage();
  const { WorkoutsList } = UseWorkouts(null, id);
  const { BodyData, BodyMeta, BodyHistoricMetric } = useBodyData(bodydataID);

  // States
  useEffect(() => {
    getStorageUser();
  }, []);

  const handleExercise = (itemDay) => {
    if (!id) return;
    navigate(`/home/workouts/exercise/${itemDay.id}`, {
      state: { userid: id, bodydataID: bodydataID },
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
            <p className="subtitle">Faltam</p>
            <p>{date.getDay()}/7</p>
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
            <p className="subtitle">Faltam</p>
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
