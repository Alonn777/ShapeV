import { useEffect, useState } from "react";

export const UseGet= (url, id) => {
  const [Exercise, SetExercise] = useState([]);
  const [Workout, SetWorkout] = useState()
  
  useEffect(() => {
    const requestData = async () => {
      const data = await fetch(url);
      const dataJSON = await data.json();
     exerciseData(dataJSON)
    };
    requestData();
  }, []);

   const exerciseData = async (data)=>{
        const user = await data
        const dayExercise = user.workouts.find((dayExercise)=> dayExercise.id === parseInt(id))
        SetWorkout(dayExercise)
        SetExercise(dayExercise.exercises)
    }

  return {Exercise, Workout}
};
