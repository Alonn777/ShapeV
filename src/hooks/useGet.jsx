import { useEffect, useState } from "react";

export const UseGet = (url, id) => {
  const [Exercise, SetExercise] = useState([]);
  const [Workout, SetWorkout] = useState();
  const [DietServer, SetDietServer] = useState({});
  const [FoodServer, SetFood] = useState([]);
  const [SearchFoodServer, SetFoodServer] = useState([])

  useEffect(() => {
    const requestData = async () => {
      const data = await fetch(url);
      const dataJSON = await data.json();
      SetDietServer(dataJSON);
      exerciseData(dataJSON);
    };
    requestData();
  }, []);

  // requsição nas dietas
  const GetFood = async (UrlTaco) => {
    const data = await fetch(UrlTaco);
    const dataJSON = await data.json();
    SetFood(dataJSON);
  };

  const SearchFood = async (FoodValue)=>{
    const data = await fetch(`http://localhost:3000/taco/search?macronutri=${FoodValue}`)
    const dataJSON = await data.json()
    SetFoodServer(dataJSON)
  }

  // funções para requsição de exercicios
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
    SetDietServer(dataJSON);
  };
  return { Exercise, Workout, UpdateState, DietServer, GetFood, FoodServer, SearchFood, SearchFoodServer };
};
