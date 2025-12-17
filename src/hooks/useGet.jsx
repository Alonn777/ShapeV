import { useEffect, useState } from "react";

export const UseGet = (url, id) => {
  const [Exercise, SetExercise] = useState([]);
  const [Workout, SetWorkout] = useState();
  const [DietServer, SetDietServer] = useState({});
  const [FoodServer, SetFood] = useState([]);
  const [SearchFoodServer, SetFoodServer] = useState([]);

  useEffect(() => {
    const requestData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      SetDietServer(data);
      SetExercise(data);
    };
    requestData();
  }, [url]);

  // requsição nas dietas
  const GetFood = async (UrlTaco) => {
    const data = await fetch(UrlTaco);
    const dataJSON = await data.json();
    SetFood(dataJSON);
  };

  const SearchFood = async (FoodValue) => {
    const data = await fetch(
      `http://localhost:3000/taco/search?macronutri=${FoodValue}`
    );
    const dataJSON = await data.json();
    SetFoodServer(dataJSON);
  };

  // funções para requsição de exercicios
  const requestWorkout = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    SetWorkout(data);
  };
  // função para atualizar o estado
  const UpdateState = async (UrlState) => {
    const data = await fetch(UrlState);
    const dataJSON = await data.json();
    SetDietServer(dataJSON);
  };
  return {
    Exercise,
    Workout,
    requestWorkout,
    UpdateState,
    DietServer,
    GetFood,
    FoodServer,
    SearchFood,
    SearchFoodServer,
  };
};
