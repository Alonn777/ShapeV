import React, { useEffect, useState } from "react";
import { Dumbbell, Trophy, HistoryIcon, Logs } from "lucide-react";
import "../../../css/AnalysisWorkout.css";
import HistoricWorkout from "./HistoricWorkout.jsx";
import PersonalRecord from "./PersonalRecord.jsx";
import WeightWorkout from "./WeightWorkout.jsx";
import { UseWorkouts } from "../../../hooks/useWorkouts.jsx";

const AnalysisWorkouts = ({ LogsExercise, token }) => {
  const { GetExerciseHistoric } = UseWorkouts();

  const [CurrentExercise, SetCurrentExercise] = useState([]);
  const [CurrentAnalysis, SetCurrentAnalysis] = useState(0);
  const [SelectedExercise, SetSelectedExercise] = useState(null);
  const components = [
    <HistoricWorkout CurrentExercises={CurrentExercise} />,
    <PersonalRecord CurrentExercises={CurrentExercise}/>,
    <WeightWorkout />,
  ];

  useEffect(() => {
    const RequesttExerciseHistoric = async () => {
      const response = await GetExerciseHistoric(
        `/exercises-historic/${LogsExercise[0].id}`,
        token,
      );
      SetCurrentExercise(response);
    };
    RequesttExerciseHistoric();
  }, [LogsExercise]);

  useEffect(() => {
    if (!SelectedExercise) return;
    const RequesttExerciseHistoric = async () => {
      const response = await GetExerciseHistoric(
        `/exercises-historic/${SelectedExercise}`,
        token,
      );
      SetCurrentExercise(response);
    };
    RequesttExerciseHistoric();
  }, [SelectedExercise]);

  return (
    <div className="Analysis_Workouts">
      <div className="header-analysis">
        <h3>Análise de Perfomance</h3>
        <div className="select-exercise">
          <form>
            <p>Escolha o exercicio:</p>
            <select
              name="exercises"
              onChange={(e) => SetSelectedExercise(e.target.value)}
            >
              {LogsExercise.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className="navigate-analysis">
          <button onClick={() => SetCurrentAnalysis(0)}>
            <span>
              <Dumbbell color="#fff" />
            </span>
            Peso
          </button>
          <button onClick={() => SetCurrentAnalysis(1)}>
            <span>
              <Trophy color="#fff" />
            </span>
            Recorde Pessoal (PR)
          </button>
          <button onClick={() => SetCurrentAnalysis(2)}>
            <span>
              <HistoryIcon color="#fff" />
            </span>
            Histórico de sessões
          </button>
        </div>
      </div>
      {components[CurrentAnalysis]}
    </div>
  );
};

export default AnalysisWorkouts;
