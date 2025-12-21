import { useEffect, useState } from "react";

export const UseGetDiet = (url, userId = null) => {
  const [DietServer, SetDietServer] = useState({});
  const [SnackDiaryData, SetSnackDiary] = useState(null);
  const [HidrateData, SetHidrateData] = useState(null)
  const [FoodServer, SetFood] = useState([]);
  const [SearchFoodServer, SetFoodServer] = useState([]);

  useEffect(() => {
    if (!url) return;
    const requestData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        SetDietServer(data);
      } catch (error) {
        console.error("Erro ao buscar dados da dieta:", error);
      }
    };
    requestData();
  }, [url]);

  useEffect(() => {
    if (!userId) return;
    const requestSnack = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/diets/snack/${userId}`
        );
        const data = await response.json();
        SetSnackDiary(data);
      } catch (error) {
        console.error("Erro ao buscar snacks:", error);
      }
    };
    requestSnack();

     const requestHidrate = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/diets/hidrate/${userId}`
        );
        const data = await response.json();
        SetHidrateData(data)
      } catch (error) {
        console.error("Erro ao buscar copos:", error);
      }
    };
    requestHidrate()
  }, [userId]);

  
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

  return {
    DietServer,
    HidrateData,
    SnackDiaryData,
    GetFood,
    FoodServer,
    SearchFood,
    SearchFoodServer,
  };
};
