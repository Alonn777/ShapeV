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
} from "../services/DietDataService.js";

export const UseGetDiet = (url, userId = null) => {
  const [DietServer, SetDietServer] = useState({});
  const [SnackDiaryData, SetSnackDiary] = useState(null);
  const [HidrateData, SetHidrateData] = useState(null);
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
        const data = await getSnackDiary(userId);
        SetSnackDiary(data);
      } catch (error) {
        console.error("Erro ao buscar snacks:", error);
      }
    };
    requestSnack();

    const requestHidrate = async () => {
      try {
        const data = await getHydration(userId);
        SetHidrateData(data);
      } catch (error) {
        console.error("Erro ao buscar copos:", error);
      }
    };
    requestHidrate();
  }, [userId]);

  // requsição nas dietas
  const GetFood = async () => {
    try {
      const response = await getTacoFoods();
      SetFood(response);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  const SearchFood = async (FoodValue) => {
    try {
      const response = await searchTacoFoods(FoodValue);
      SetFoodServer(response);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  // Ações específicas do SnackDiary (mantidas no hook, usando o service)
  const UpdateSnackExpand = async (snackId, body) => {
    return patchSnackExpand(snackId, body);
  };

  const RefreshSnackDiary = async (UserId) => {
    const data = await getSnackDiary(UserId);
    SetSnackDiary(data);
    return data;
  };

  const DeleteSnackFood = async (foodId) => {
    return deleteSnackFood(foodId);
  };

  // Ações específicas do WaterManage (mantidas no hook, usando o service)
  const RefreshHydration = async (UserId) => {
    const data = await getHydration(UserId);
    SetHidrateData(data);
    return data
  };

  const CreateHydrationCup = async (UserId, cupData) => {
    return postHydrationCup(UserId, cupData);
  };

  const UpdateHydrationCup = async (cupId, cupPatch) => {
    return putHydrationCup(cupId, cupPatch);
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
  };
};
