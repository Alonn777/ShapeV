import { useEffect, useState } from "react";
import {
  getMetricas,
  postMetrica,
  getBodyMeta,
  postMeta
} from "../services/BodyDataService.js";

export const useBodyData = (id) => {
  const [BodyData, SetBodyData] = useState(null);
  const [BodyMeta, SetBodyMeta] = useState(null);

  useEffect(() => {
    if (id) {
      const requestBodyMetric = async () => {
        const response = await getMetricas(id);
        SetBodyData(response);
      };
      const requestMeta = async () => {
        const response = await getBodyMeta(id);
        SetBodyMeta(response);
      };
      requestBodyMetric();
      requestMeta();
    }
  }, [id]);
  const createMetrica = async (data) => {
    const response = await postMetrica(id, data);
    
  };
  const createMeta = async(data)=>{
    const response = await postMeta(id, data)
  }
  const refreshData = async () => {
    const response = await getMetricas(id);
    SetBodyData(response);
  };
  const refreshMeta = async ()=>{
      const response = await getBodyMeta(id);
      SetBodyMeta(response);
  }
  return {
    BodyData,
    BodyMeta,
    createMetrica,
    refreshData,
    refreshMeta,
    createMeta
  };
};
