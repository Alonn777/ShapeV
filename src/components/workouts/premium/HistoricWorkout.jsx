import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const HistoricWorkout = ({ CurrentExercises }) => {
  const chartData = useMemo(
    () =>
      [...CurrentExercises]
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .map((item) => ({
          date: new Date(item.created_at).toLocaleDateString("pt-BR"),
          peso: item.weight,
        })),
    [CurrentExercises],
  );

  const ActualData = CurrentExercises.at(-1);
  const FirstData = CurrentExercises[0];
  if (!ActualData || !FirstData) return null;
  const Evolution = ActualData.weight - FirstData.weight;
  const MaxWeight = CurrentExercises.reduce(
    (max, exercise) => Math.max(max, exercise.weight),
    0,
  );

  return (
    <div>
      <div className="resume_DataContainer">
        <div className="resume-box">
          <p>Peso atual:</p>
          <p className="actual-info">{ActualData ? ActualData.weight : 0} kg</p>
        </div>
        <div className="resume-box">
          <p>Evolução:</p>
          <p className="actual-info">{Evolution ? Evolution : 0} kg</p>
        </div>
        <div className="resume-box">
          <p>Maior peso:</p>
          <p className="actual-info ">{MaxWeight ? MaxWeight : 0} kg</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="graph">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                labelStyle={{ color: "#333", fontWeight: "500" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              />
              <Line
                type="monotone"
                dataKey="peso"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HistoricWorkout;
