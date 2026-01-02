export const UsePut = () => {
  const UpdatePut = async (url, data) => {
    try {
      const Request = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return Request;
    } catch {
      console.error("Error: Ocorreu erro na sua atualização");
    }
  };

  return { UpdatePut };
};
