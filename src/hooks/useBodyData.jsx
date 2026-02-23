import { useEffect, useState } from "react";
import {
  getMetricas,
  postMetrica,
  getBodyMeta,
  GetHistoricMetric,
  postMeta,
} from "../services/BodyDataService.js";

export const useBodyData = (id, token) => {
  const [BodyData, SetBodyData] = useState(null);
  const [BodyMeta, SetBodyMeta] = useState(null);
  const [BodyHistoricMetric, SetBodyHistoric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingMetrica, setSavingMetrica] = useState(false);
  const [savingMeta, setSavingMeta] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (id) {
      const requestBodyMetric = async () => {
        try {
          setLoading(true);
          const response = await getMetricas(id, token);
          SetBodyData(response);
        } catch (error) {
          console.error("Erro ao buscar métricas:", error);
        } finally {
          setLoading(false);
        }
      };
      const requestMeta = async () => {
        try {
          const response = await getBodyMeta(id, token);
          SetBodyMeta(response);
        } catch (error) {
          console.error("Erro ao buscar meta:", error);
        }
      };

      const requestBodyHistoric = async () => {
        try {
          const response = await GetHistoricMetric(id, token);
          SetBodyHistoric(response)
        } catch (error) {
          console.error("Erro ao buscar meta:", error);
        }
      };
      requestBodyMetric();
      requestMeta();
      requestBodyHistoric();
    }
  }, [id, token]);

  const createMetrica = async (data, tokenIn) => {
    try {
      setSavingMetrica(true);
      const response = await postMetrica(id, data, tokenIn);
      return response;
    } catch (error) {
      console.error("Erro ao criar métrica:", error);
    } finally {
      setSavingMetrica(false);
    }
  };

  const createMeta = async (data, tokenIn) => {
    try {
      setSavingMeta(true);
      const response = await postMeta(id, data, tokenIn);
      return response;
    } catch (error) {
      console.error("Erro ao criar meta:", error);
    } finally {
      setSavingMeta(false);
    }
  };

  const refreshData = async (tokenIn) => {
    try {
      setRefreshing(true);
      const response = await getMetricas(id, tokenIn);
      SetBodyData(response);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const refreshMeta = async (tokenIn) => {
    try {
      setRefreshing(true);
      const response = await getBodyMeta(id, tokenIn);
      SetBodyMeta(response);
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const refreshBodyHistoric = async (tokenIn) => {
    try {
      const response = await GetHistoricMetric(id, tokenIn);
      SetBodyHistoric(response);
    } catch {
      console.error("Erro ao atualizar meta:", error);
    }
  };

  return {
    BodyData,
    BodyMeta,
    BodyHistoricMetric,
    createMetrica,
    refreshData,
    refreshBodyHistoric,
    refreshMeta,
    createMeta,
    loading,
    savingMetrica,
    savingMeta,
    refreshing,
  };
};
