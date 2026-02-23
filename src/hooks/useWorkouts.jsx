import { useEffect, useState } from "react";
import {
  PatchWorkoutService,
  GetWorkoutService,
  PutExerciseService,
  DeleteExerciseService,
  GetExerciseService,
  PostWorkoutService,
} from "../services/WorkoutService.js";

export const UseWorkouts = (exerciseID = null, userId = null, token) => {
  const [Exercise, SetExercise] = useState([]);
  const [WorkoutsList, SetWorkoutsList] = useState([]);

  useEffect(() => {
    if (!exerciseID || !token) return ;
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

  const refreshWorkouts = async (id, tokenIn) => {
    try {
      const response = await GetWorkoutService(id, tokenIn);
      console.log(response);
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
  };
};
