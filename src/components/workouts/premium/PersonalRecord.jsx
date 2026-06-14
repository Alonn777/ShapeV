import React, { useMemo } from "react";
import { Trophy } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const [, month, day] = dateStr.split("-");
  if (!month || !day) return dateStr;
  return `${day}/${month}`;
};

const PersonalRecord = ({ CurrentExercises }) => {
  const personalRecord = useMemo(() => {
    if (!CurrentExercises?.length) return null;

    return CurrentExercises.reduce((best, current) => {
      if (!best || current.weight > best.weight) return current;
      if (
        current.weight === best.weight &&
        new Date(current.created_at) > new Date(best.created_at)
      ) {
        return current;
      }
      return best;
    }, null);
  }, [CurrentExercises]);

  if (!personalRecord) {
    return (
      <div className="pr-empty">
        <p>Nenhum recorde encontrado para este exercício.</p>
      </div>
    );
  }

  return (
    <div className="pr-container">
      <div className="pr-card">
        <div className="pr-icon-box">
          <Trophy size={22} color="#d4af37" />
        </div>
        <div className="pr-info">
          <p className="pr-label">
            Recorde Pessoal - {personalRecord.exercise_name}
          </p>
          <p className="pr-weight">{personalRecord.weight} kg</p>
          <p className="pr-date">
            Atingido em {formatDate(personalRecord.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecord;
