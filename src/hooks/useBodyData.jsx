import { useEffect, useState } from "react";
import { getMetricas, postMetrica } from "../services/BodyDataService.js";

export const useBodyData = (id) => {
  const [BodyData, SetBodyData] = useState();

  useEffect(() => {
    if (id) {
      const requestDiet = async () => {
        const response = await getMetricas(id);
        SetBodyData(response);
      };
      requestDiet();
    }
  }, [id]);
  const createMetrica = async (data) => {
    const response = await postMetrica(id, data);
    console.log("Oi")
  };

  return {
    BodyData,
    createMetrica
  };
};
