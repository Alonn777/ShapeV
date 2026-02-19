import { useState } from "react";
import { PostUser } from "../services/UserService.js";
import toast from "react-hot-toast";

export const useUsers = () => {
  const postUser = async (route, data) => {
    try {
      const response = await PostUser(route, data);
      toast.success("Usuário criado com sucesso");
    } catch {
      toast.error(
        "ERROR: Verifique se a sua confirmação de senha está correta",
      );
    }
  };

    const postLogin = async (route, data) => {
    try {
    
      const response = await PostUser(route, data);
      toast.success("Bem-vindo ao ShapeV");
      return response
    } catch {
      toast.error(
        "ERROR: Verifique se a sua senha ou email está correta",
      );
    }
  };
  return {
    postUser,
    postLogin
  };
};
