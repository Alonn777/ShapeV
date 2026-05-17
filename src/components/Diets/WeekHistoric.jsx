import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp, History } from "lucide-react";

const toDateKey = (date) => date.toISOString().split("T")[0];

const formatDisplayDate = (date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const getDayLabel = (date, now) => {
  const dayDiff = Math.round((now - date) / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) return "Hoje";
  if (dayDiff === 1) return "Ontem";

  return date.toLocaleDateString("pt-BR", { weekday: "long" });
};

const WeekHistoric = ({ HistoricSnack = [] }) => {
  const [openDay, setOpenDay] = useState(null);

  const dailyHistory = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      const dateKey = toDateKey(date);
      let kcal = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;

      const mealSections = HistoricSnack.map((section, sectionIndex) => {
        const foods = (section?.Snack_List || []).filter(
          (food) => food?.logged_at === dateKey,
        );

        const sectionKcal = foods.reduce(
          (acc, food) => acc + Number(food.energy_kcal || 0),
          0,
        );

        foods.forEach((food) => {
          kcal += Number(food.energy_kcal || 0);
          protein += Number(food.protein_g || 0);
          carbs += Number(food.carbohydrate_g || 0);
          fat += Number(food.lipid_g || 0);
        });

        return {
          key: section?.id || `section-${sectionIndex}`,
          name: section?.name || "Refeição",
          foods,
          kcal: sectionKcal,
        };
      });

      return {
        dateKey,
        dayLabel: getDayLabel(date, today),
        displayDate: formatDisplayDate(date),
        kcal,
        protein,
        carbs,
        fat,
        meals: mealSections.filter((meal) => meal.foods.length > 0).length,
        mealSections,
      };
    });
  }, [HistoricSnack]);

  const toggleDay = (dayKey) => {
    setOpenDay((prev) => (prev === dayKey ? null : dayKey));
  };

  return (
    <section className="week-historic">
      <header className="week-historic__header">
        <div className="week-historic__title">
          <History size={20} color="#e2e8f0" />
          <h3>Histórico de Refeições - Últimos 7 dias</h3>
        </div>
      </header>

      <div className="week-historic__list">
        {dailyHistory.map((day) => {
          const isOpen = openDay === day.dateKey;
          return (
            <article className="week-historic__item" key={day.dateKey}>
              <button
                type="button"
                className="week-historic__row"
                onClick={() => toggleDay(day.dateKey)}
              >
                <div className="week-historic__date-group">
                  <div className="week-historic__icon">
                    <CalendarDays size={18} color="#60a5fa" />
                  </div>
                  <div className="week-historic__date-info">
                    <p className="week-historic__day">{day.dayLabel}</p>
                    <p className="week-historic__date">{day.displayDate}</p>
                  </div>
                </div>

                <div className="week-historic__kcal-group">
                  <p className="week-historic__kcal">
                    {Math.round(day.kcal)} kcal
                  </p>
                  <p className="week-historic__meals">
                    {day.meals} {day.meals === 1 ? "refeição" : "refeições"}
                  </p>
                </div>

                <span className="week-historic__chevron">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="week-historic__expand">
                  <p className="week-historic__macros">
                    Proteína: {day.protein.toFixed(1)}g | Carboidrato:{" "}
                    {day.carbs.toFixed(1)}g | Gordura: {day.fat.toFixed(1)}g
                  </p>

                  <div className="week-historic__meals-list">
                    {day.mealSections.map((meal) => (
                      <article className="week-historic__meal" key={meal.key}>
                        <div className="week-historic__meal-header">
                          <h4>{meal.name}</h4>
                          <p>{Math.round(meal.kcal)} kcal</p>
                        </div>

                        {meal.foods.length > 0 ? (
                          <ul className="week-historic__foods">
                            {meal.foods.map((food, index) => (
                              <li key={`${food.id || food.description}-${index}`}>
                                <span>{food.description || "Alimento"}</span>
                                <span>
                                  {Number(food.energy_kcal || 0).toFixed(0)} kcal
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="week-historic__empty">Nada</p>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WeekHistoric;