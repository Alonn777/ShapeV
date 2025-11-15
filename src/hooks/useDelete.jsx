export const UseDelete = () => {
  const DeleteExercise = async (url, exercise) => {
    try {
      const Request = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(exercise),
      });
    } catch {
      console.error("Error: Ocorreu erro na sua atualização");
    }
  };

  return { DeleteExercise};
};
