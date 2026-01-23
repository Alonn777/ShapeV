import { useEffect, useState } from "react";
import {UpdateWorkoutService} from '../services/WorkoutService.js'

export const UseWorkouts = (exerciseUrl = null, userId = null) => {
  const [Exercise, SetExercise] = useState([]);
  const [Workout, SetWorkout] = useState(null);
  const [WorkoutsList, SetWorkoutsList] = useState([]);

  // Buscar exercícios de um workout específico
  useEffect(() => {
    if (!exerciseUrl) return;
    const requestData = async () => {
      try {
        const response = await fetch(exerciseUrl);
        const data = await response.json();
        SetExercise(data);
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
      }
    };
    requestData();
  }, [exerciseUrl]);

  // Buscar lista de workouts do usuário
  useEffect(() => {
    if (!userId) return;
    const requestWorkouts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/workouts/${userId}`
        );
        const data = await response.json();
        SetWorkoutsList(data);
      } catch (error) {
        console.error("Erro ao buscar workouts:", error);
      }
    };
    requestWorkouts();
  }, [userId]);

  // Função para buscar um workout específico
  const requestWorkout = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      SetWorkout(data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar workout:", error);
    }
  };

  // Função para atualizar exercício (PUT)
  const updateExercise = async (url, exerciseData) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });
      return response;
    } catch (error) {
      console.error("Erro ao atualizar exercício:", error);
    }
  };

  // Função para atualizar workout (PATCH)
  const updateWorkout = async (id, workoutData) => {
    try {
      const response = await UpdateWorkoutService(id, workoutData)
      // const response = await fetch(url, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(workoutData),
      // });
      // return response;
    } catch (error) {
      console.error("Erro ao atualizar workout:", error);
    }
  };

  // Função para criar exercício (POST)
  const createExercise = async (url, exerciseData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });
      return response;
    } catch (error) {
      console.error("Erro ao criar exercício:", error);
    }
  };

  // Função para deletar exercício (DELETE)
  const deleteExercise = async (url) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao deletar exercício:", error);
    }
  };

  // Função para atualizar lista de exercícios após mudanças
  const refreshExercises = async () => {
    if (!exerciseUrl) return;
    try {
      const response = await fetch(exerciseUrl);
      const data = await response.json();
      SetExercise(data);
    } catch (error) {
      console.error("Erro ao atualizar exercícios:", error);
    }
  };

  // Função para atualizar a lista de workouts após mudanças


  return {
    Exercise,
    Workout,
    WorkoutsList,
    requestWorkout,
    updateExercise,
    updateWorkout,
    createExercise,
    deleteExercise,
    refreshExercises,
 
  };
};
