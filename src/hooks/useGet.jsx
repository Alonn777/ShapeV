import { useEffect, useEffectEvent } from "react";
import { useState } from "react";

export const UseGet = (id) => {
  const [FoodServer, SetFood] = useState([]);
  const [SearchFoodServer, SetFoodServer] = useState([]);
  const [DietCredential, SetDietCredential] = useState({});
  const [BodyDataCredential, SetBodyDataCredential] = useState({});

  useEffect(() => {
    if (id) {
      const requestCredential = async () => {
        const [DietCredential, BodyDataCredential] = await Promise.all([
          fetch(`http://localhost:3000/users/diets/${id}`).then((res) =>
            res.json()
          ),
          fetch(`http://localhost:3000/users/bodydata/${id}`).then((res) =>
            res.json()
          ),
        ]);
        SetDietCredential(DietCredential);
        SetBodyDataCredential(BodyDataCredential);
        console.log(BodyDataCredential)
      };
      requestCredential();
    }
  }, [id]);

  const GetFood = async (UrlTaco) => {
    try {
      const data = await fetch(UrlTaco);
      const dataJSON = await data.json();
      SetFood(dataJSON);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  const SearchFood = async (FoodValue) => {
    try {
      const data = await fetch(
        `http://localhost:3000/taco/search?macronutri=${FoodValue}`
      );
      const dataJSON = await data.json();
      SetFoodServer(dataJSON);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    }
  };

  return {
    GetFood,
    FoodServer,
    SearchFood,
    SearchFoodServer,
    DietCredential,
    BodyDataCredential,
  };
};
