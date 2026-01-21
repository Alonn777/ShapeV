import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const GraphBodyData = ({ graphData }) => {
  const [ChartData, SetChartData] = useState([]);
  useEffect(() => {
    const FormatGraphData = (graphData) => {
      const graphFormated = graphData.map((item) => ({
        date: new Date(item.created_at).toLocaleDateString("pt-BR"),
        peso: item.weight,
      }));

      SetChartData(graphFormated);
    };
    FormatGraphData(graphData);
  }, [graphData]);
  console.log(ChartData);

  if (!graphData) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }
  return (
    <div className="graph">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ChartData}>
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
          <Line type="monotone" dataKey="peso" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphBodyData;
