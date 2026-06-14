import { useEffect, useState } from "react";
import {
  PatchWorkoutService,
  GetWorkoutService,
  PutExerciseService,
  DeleteExerciseService,
  GetExerciseService,
  PostWorkoutService,
  Create,
  Patch,
  Get,
} from "../services/WorkoutService.js";
import { create } from "../services/DietDataService.js";
import { AwardIcon } from "lucide-react";
import { data } from "react-router-dom";

export const UseWorkouts = (exerciseID = null, userId = null, token) => {
  const [Exercise, SetExercise] = useState([]);
  const [WorkoutsList, SetWorkoutsList] = useState([]);
  const [LogsExerciseUser, SetLogExercisesUser] = useState([]);

  useEffect(() => {
    if (!exerciseID || !token) return;
    const requestData = async () => {
      try {
        const response = await GetExerciseService(exerciseID, token);
        SetExercise(response);
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
      }
    };
    requestData();
  }, [exerciseID, token]);

  useEffect(() => {
    if (!userId || !token) return;
    const requestWorkouts = async () => {
      try {
        const response = await GetWorkoutService(userId, token);
        SetWorkoutsList(response);
      } catch (error) {
        console.error("Erro ao buscar workouts:", error);
      }
    };
    requestWorkouts();
  }, [userId, token]);

  // Novas funções de requisição
  useEffect(() => {
    const requestExerciseLogsUser = async () => {
      try {
        const response = await Get(`/exercises-logs/${userId}`, token);
        SetLogExercisesUser(response);
      } catch (error) {
        console.error({ Error: "Error in the request, verify" });
      }
    };
    requestExerciseLogsUser();
  }, [userId, token]);

  // Requisições sem useEffect
  const GetExerciseHistoric = async (Route, token) => {
    try {
      const response = await Get(Route, token);
      return response
    } catch (error) {
      console.error({ Error: "Error in the request, verify" });
    }
  };
  const create_workout_session = async (Route, data, token) => {
    try {
      const response = await Create(Route, data, token);
      return response;
    } catch (error) {
      console.error({ Error: "Error in the request, verify" });
    }
  };

  const PatchRequest = async (Route, data, token) => {
    try {
      const response = await Patch(Route, data, token);
      return response;
    } catch (error) {
      console.error({ Error: "Error in the request, verify" });
    }
  };

  // Funções de requisição hard coded
  const refreshWorkouts = async (id, tokenIn) => {
    try {
      const response = await GetWorkoutService(id, tokenIn);
      SetWorkoutsList(response);
    } catch (error) {
      console.error("Erro ao buscar workout:", error);
    }
  };

  const updateExercise = async (id, data, tokenIn) => {
    try {
      const response = await PutExerciseService(id, data, tokenIn);
    } catch (error) {
      console.error("Erro ao atualizar exercício:", error);
    }
  };

  const updateWorkout = async (id, workoutData, tokenIn) => {
    try {
      const response = await PatchWorkoutService(id, workoutData, tokenIn);
    } catch (error) {
      console.error("Erro ao atualizar workout:", error);
    }
  };

  const createExercise = async (id, data, tokenIn) => {
    try {
      const response = await PostWorkoutService(id, data, tokenIn);
      return response;
    } catch (error) {
      console.error("Erro ao criar exercício:", error);
    }
  };

  const deleteExercise = async (id, tokenIn) => {
    try {
      const response = await DeleteExerciseService(id, tokenIn);
      return response;
    } catch (error) {
      console.error("Erro ao deletar exercício:", error);
    }
  };

  const refreshExercises = async (tokenIn) => {
    if (!exerciseID) return;
    try {
      const response = await GetExerciseService(exerciseID, tokenIn);
      SetExercise(response);
    } catch (error) {
      console.error("Erro ao atualizar exercícios:", error);
    }
  };

  return {
    Exercise,
    WorkoutsList,
    refreshWorkouts,
    updateExercise,
    updateWorkout,
    createExercise,
    deleteExercise,
    refreshExercises,
    create_workout_session,
    PatchRequest,
    LogsExerciseUser,
    GetExerciseHistoric,
  };
};
