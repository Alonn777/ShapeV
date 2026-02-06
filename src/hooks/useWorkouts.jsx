import { useEffect, useState } from "react";
import {
  PatchWorkoutService,
  GetWorkoutService,
  PutExerciseService,
  DeleteExerciseService,
  GetExerciseService,
  PostWorkoutService,
} from "../services/WorkoutService.js";

export const UseWorkouts = (exerciseID = null, userId = null) => {
  const [Exercise, SetExercise] = useState([]);
  const [WorkoutsList, SetWorkoutsList] = useState([]);

  useEffect(() => {
    if (!exerciseID) return;
    const requestData = async () => {
      try {
        const response = await GetExerciseService(exerciseID);
        SetExercise(response);
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
      }
    };
    requestData();
  }, [exerciseID]);

  useEffect(() => {
    if (!userId) return;
    const requestWorkouts = async () => {
      try {
        const response = await GetWorkoutService(userId);
        SetWorkoutsList(response);
      } catch (error) {
        console.error("Erro ao buscar workouts:", error);
      }
    };
    requestWorkouts();
  }, [userId]);

  const refreshWorkouts = async (id) => {
    try {
      const response = await GetWorkoutService(id);
      console.log(response);
      SetWorkoutsList(response);
    } catch (error) {
      console.error("Erro ao buscar workout:", error);
    }
  };

  const updateExercise = async (id, data) => {
    try {
      const response = await PutExerciseService(id, data);
    } catch (error) {
      console.error("Erro ao atualizar exercício:", error);
    }
  };

  const updateWorkout = async (id, workoutData) => {
    try {
      const response = await PatchWorkoutService(id, workoutData);
    } catch (error) {
      console.error("Erro ao atualizar workout:", error);
    }
  };

  const createExercise = async (id, data) => {
    try {
      const response = await PostWorkoutService(id, data);
      return response;
    } catch (error) {
      console.error("Erro ao criar exercício:", error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      const response = await DeleteExerciseService(id);
      return response;
    } catch (error) {
      console.error("Erro ao deletar exercício:", error);
    }
  };

  const refreshExercises = async () => {
    if (!exerciseID) return;
    try {
      const response = await GetExerciseService(exerciseID);
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
