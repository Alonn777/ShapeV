import { useEffect, useEffectEvent } from "react";
import { useState } from "react";

export const UseGet = (id, token) => {
  const [FoodServer, SetFood] = useState([]);
  const [SearchFoodServer, SetFoodServer] = useState([]);
  const [DietCredential, SetDietCredential] = useState({});
  const [BodyDataCredential, SetBodyDataCredential] = useState({});
  const [data, SetData] = useState();

  useEffect(() => {
    if (id) {
      const requestCredential = async () => {
        const [DietCredential, BodyDataCredential] = await Promise.all([
          fetch(`http://localhost:3000/users/diets/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
          fetch(`http://localhost:3000/users/bodydata/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
        ]);
        SetDietCredential(DietCredential);
        SetBodyDataCredential(BodyDataCredential);
      };
      requestCredential();
    }
    if (id === null) {
      console.log("O id é nulo!, requisição invalidad");
    }
  }, [id]);

  // useEffect(() => {
  //   if (url) {
  //     const requestData = async () => {
  //       try {
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         SetData(data);
  //       } catch (error) {
  //         console.error({ Error: "Algum erro na sua requisição" }, error);
  //       }
  //     };
  //     requestData();
  //   }
  // }, [url]);

  // Funcionalidades para requisição do alimento (tirar deste hook depois)
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
        `http://localhost:3000/taco/search?macronutri=${FoodValue}`,
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
    data,
    BodyDataCredential,
  };
};
