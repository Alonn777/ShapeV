import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";

const METRICS = [
  { key: "calorias", label: "Calorias", field: "energy_kcal", unit: "" },
  { key: "proteina", label: "Proteína", field: "protein_g", unit: "g" },
  { key: "carbos", label: "Carbos", field: "carbohydrate_g", unit: "g" },
  { key: "gordura", label: "Gordura", field: "lipid_g", unit: "g" },
];

const WEEKDAY_SHORT = {
  "seg.": "Seg",
  "ter.": "Ter",
  "qua.": "Qua",
  "qui.": "Qui",
  "sex.": "Sex",
  "sáb.": "Sáb",
  "dom.": "Dom",
};

const toDateKey = (date) => date.toISOString().split("T")[0];

const getWeekdayLabel = (date) => {
  const shortName = date
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .toLowerCase();

  return WEEKDAY_SHORT[shortName] || shortName.replace(".", "");
};

const formatMetricValue = (value, unit) => {
  const fixed = Number(value || 0).toFixed(unit ? 1 : 0);
  return `${fixed}${unit}`;
};

const ProgressoSemanal = ({ HistoricSnack = [] }) => {
  const [activeMetric, setActiveMetric] = useState(METRICS[0]);

  const weekData = useMemo(() => {
    const groupedByDay = HistoricSnack.reduce((acc, meal) => {
      (meal?.Snack_List || []).forEach((item) => {
        if (!item?.logged_at) return;

        const day = item.logged_at;
        if (!acc[day]) {
          acc[day] = {
            energy_kcal: 0,
            protein_g: 0,
            carbohydrate_g: 0,
            lipid_g: 0,
          };
        }

        acc[day].energy_kcal += Number(item.energy_kcal || 0);
        acc[day].protein_g += Number(item.protein_g || 0);
        acc[day].carbohydrate_g += Number(item.carbohydrate_g || 0);
        acc[day].lipid_g += Number(item.lipid_g || 0);
      });

      return acc;
    }, {});

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const dateKey = toDateKey(date);
      const dailyValues = groupedByDay[dateKey] || {
        energy_kcal: 0,
        protein_g: 0,
        carbohydrate_g: 0,
        lipid_g: 0,
      };

      return {
        dateKey,
        label: getWeekdayLabel(date),
        ...dailyValues,
      };
    });

    return days;
  }, [HistoricSnack]);

  const maxMetricValue = useMemo(() => {
    const values = weekData.map((day) => day[activeMetric.field] || 0);
    const max = Math.max(...values, 0);
    return max === 0 ? 1 : max;
  }, [activeMetric.field, weekData]);

  return (
    <section className="weekly-progress">
      <div className="weekly-progress__title">
        <TrendingUp size={20} color="#e2e8f0" />
        <h3>Progresso Semanal</h3>
      </div>

      <div className="weekly-progress__tabs" role="tablist">
        {METRICS.map((metric) => {
          const isActive = activeMetric.key === metric.key;
          return (
            <button
              key={metric.key}
              type="button"
              className={`weekly-progress__tab ${isActive ? "active" : ""}`}
              onClick={() => setActiveMetric(metric)}
            >
              {metric.label}
            </button>
          );
        })}
      </div>

      <div className="weekly-progress__chart">
        {weekData.map((day) => {
          const rawValue = day[activeMetric.field] || 0;
          const fillHeight = Math.max((rawValue / maxMetricValue) * 100, 10);

          return (
            <article className="weekly-progress__day" key={day.dateKey}>
              <p className="weekly-progress__weekday">{day.label}</p>
              <div className="weekly-progress__bar-shell">
                <div
                  className="weekly-progress__bar-fill"
                  style={{ height: `${fillHeight}%` }}
                />
              </div>
              <p className="weekly-progress__value">
                {formatMetricValue(rawValue, activeMetric.unit)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProgressoSemanal;