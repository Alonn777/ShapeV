import { useEffect, useState } from "react";

export const UseGet = (url, id) => {
  const [Exercise, SetExercise] = useState([]);
  const [Workout, SetWorkout] = useState();
  const [DietServer, SetDietServer] = useState({});

  useEffect(() => {
    const requestData = async () => {
      const data = await fetch(url);
      const dataJSON = await data.json();
      SetDietServer(dataJSON);
      exerciseData(dataJSON);
    };
    requestData();
  }, []);

  const exerciseData = (data) => {
    const user = data;
    const dayExercise = user.workouts.find(
      (dayExercise) => dayExercise.id === parseInt(id)
    );
    SetWorkout(dayExercise);
    SetExercise(dayExercise.exercises);
  };

  // função para atualizar o estado
  const UpdateState = async (UrlState) => {
    const data = await fetch(UrlState);
    const dataJSON = await data.json();
    SetDietServer(dataJSON)
  };
  return { Exercise, Workout, UpdateState, DietServer };
};
