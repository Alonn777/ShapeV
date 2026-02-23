import request from "./api.js";

// Diet - Snacks
export const getSnackDiary = async (userId, token) => {
  return request(`/users/diets/snack/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

};


export const PostSnackFood = async (snackId, body, token) => {
  return request(`/users/diets/snack/${snackId}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const patchSnackExpand = async (snackId, body, token) => {
  return request(`/users/diets/snack/${snackId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteSnackFood = async (foodId, token) => {
  return request(`/users/diets/snack/food/${foodId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }

  });
};

// Diet - Hydration
export const getHydration = async (userId, token) => {
  return request(`/users/diets/hidrate/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const postHydrationCup = async (userId, cupData, token) => {
  return request(`/users/diets/hidrate/${userId}`, {
    method: "POST",
    body: JSON.stringify(cupData),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const putHydrationCup = async (cupId, cupPatch, token) => {
  return request(`/users/diets/hidrate/cup/${cupId}`, {
    method: "PUT",
    body: JSON.stringify(cupPatch),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Taco
export const getTacoFoods = async (token) => {
  return request(`/taco`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const searchTacoFoods = async (macroNutri, token) => {
  const q = encodeURIComponent(macroNutri ?? "");
  return request(`/taco/search?macronutri=${q}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

