export const UseDelete = () => {
  const Delete = async (url, exercise) => {
    try {
      const Request = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
    } catch {
      console.error("Error: Ocorreu erro na sua atualização");
    }
  };

  return { Delete };
};
