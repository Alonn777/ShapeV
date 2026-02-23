import { useEffect, useState } from "react";
import {
  getHydration,
  getSnackDiary,
  getTacoFoods,
  patchSnackExpand,
  deleteSnackFood,
  searchTacoFoods,
  postHydrationCup,
  putHydrationCup,
  PostSnackFood,
} from "../services/DietDataService.js";

export const UseGetDiet = (url, userId = null, token) => {
  const [DietServer, SetDietServer] = useState({});
  const [SnackDiaryData, SetSnackDiary] = useState(null);
  const [HidrateData, SetHidrateData] = useState(null);
  const [FoodServer, SetFood] = useState([]);
  const [SearchFoodServer, SetFoodServer] = useState([]);

  useEffect(() => {
    if (!url) return;
    const requestData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        SetDietServer(data);
      } catch (error) {
        console.error("Erro ao buscar dados da dieta:", error);
      }
    };
    requestData();
  }, [url]);

  useEffect(() => {
    if (!userId || !token) return;

    const requestSnack = async () => {
      try {
        const data = await getSnackDiary(userId, token);
        SetSnackDiary(data);
      } catch (error) {
        console.error("Erro ao buscar snacks:", error);
      }
    };
    requestSnack();

    const requestHidrate = async () => {
      try {
        const data = await getHydration(userId, token);
        SetHidrateData(data);
      } catch (error) {
        console.error("Erro ao buscar copos:", error);
      }
    };
    requestHidrate();
  }, [userId, token]);

  // requsição nas dietas
  const GetFood = async (tokenIn) => {
    try {
      const response = await getTacoFoods(tokenIn);
      SetFood(response);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  const SearchFood = async (FoodValue, tokenIn) => {
    try {
      const response = await searchTacoFoods(FoodValue, tokenIn);
      SetFoodServer(response);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  // Ações específicas do SnackDiary (mantidas no hook, usando o service)

  const CreateSnackFood = async (snackId, body, tokenIn) => {
    return PostSnackFood(snackId, body, tokenIn);
  };
  const UpdateSnackExpand = async (snackId, body, tokenIn) => {
    return patchSnackExpand(snackId, body, tokenIn);
  };

  const RefreshSnackDiary = async (UserId, tokenIn) => {
    const data = await getSnackDiary(UserId, tokenIn);
    SetSnackDiary(data);
    return data;
  };

  const DeleteSnackFood = async (foodId, tokenIn) => {
    return deleteSnackFood(foodId, tokenIn);
  };

  // Ações específicas do WaterManage (mantidas no hook, usando o service)
  const RefreshHydration = async (UserId, tokenIn) => {
    const data = await getHydration(UserId, tokenIn);
    SetHidrateData(data);
    return data;
  };

  const CreateHydrationCup = async (UserId, cupData, tokenIn) => {
    return postHydrationCup(UserId, cupData, tokenIn);
  };

  const UpdateHydrationCup = async (cupId, cupPatch, tokenIn) => {
    return putHydrationCup(cupId, cupPatch, tokenIn);
  };

  return {
    DietServer,
    HidrateData,
    SnackDiaryData,
    GetFood,
    FoodServer,
    SearchFood,
    SearchFoodServer,
    UpdateSnackExpand,
    RefreshSnackDiary,
    DeleteSnackFood,
    RefreshHydration,
    CreateHydrationCup,
    UpdateHydrationCup,
    CreateSnackFood
  };
};
