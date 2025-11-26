export const UsePut = () => {
  const UpdatePut = async (url, exercise) => {
    try {
      const Request = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(exercise),
      });
    } catch {
      console.error("Error: Ocorreu erro na sua atualização");
    }
  };

  const UpdateWorkout = async (url, workoutPatch) => {
    try {
      const Request = await fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(workoutPatch),
      });
    } catch {
      console.error("Error: ocorreu um erro na requsição")
    }
  };

  return { UpdatePut, UpdateWorkout};
};
