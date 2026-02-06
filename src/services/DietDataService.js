import request from "./api.js";

// Diet - Snacks
export const getSnackDiary = async (userId) => {
  return request(`/users/diets/snack/${userId}`);
};

export const patchSnackExpand = async (snackId, body) => {
  return request(`/users/diets/snack/${snackId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

export const deleteSnackFood = async (foodId) => {
  return request(`/users/diets/snack/food/${foodId}`, {
    method: "DELETE",
  });
};

// Diet - Hydration
export const getHydration = async (userId) => {
  return request(`/users/diets/hidrate/${userId}`);
};

export const postHydrationCup = async (userId, cupData) => {
  return request(`/users/diets/hidrate/${userId}`, {
    method: "POST",
    body: JSON.stringify(cupData),
  });
};

export const putHydrationCup = async (cupId, cupPatch) => {
  return request(`/users/diets/hidrate/cup/${cupId}`, {
    method: "PUT",
    body: JSON.stringify(cupPatch),
  });
};

// Taco
export const getTacoFoods = async () => {
  return request(`/taco`);
};

export const searchTacoFoods = async (macroNutri) => {
  const q = encodeURIComponent(macroNutri ?? "");
  return request(`/taco/search?macronutri=${q}`);
};

