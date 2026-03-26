import { useEffect, useState } from "react";
import { GET, PUT } from "../services/AdminService.js";
import toast from "react-hot-toast";

export const useAdmin = (token, id) => {
  const [CountInfos, SetCountInfos] = useState(null);
  const [UsersInfo, SetUsersInfo] = useState([]);
  useEffect(() => {
    if (!token) return;
    const FindCountUsers = async () => {
      try {
        const response = await GET(token, "/users/infos");
        SetCountInfos(response);
        return response;
      } catch (error) {
        toast.error("Erro ao buscar informações");
      }
    };
    FindCountUsers();

    const FindUsers = async () => {
      try {
        const response = await GET(token, "/users");
        SetUsersInfo(response);
      } catch (error) {
        toast.error("Erro ao buscar usuários");
      }
    };
    FindUsers();
  }, [token]);

  const UpdateUserAdmin = async (token, id, user)=>{
    try {
      const response = await PUT(token, `/users/${id}`, user)
    } catch (error) {
      toast.error("Erro ao atualizar usuário!")
      console.error({error: "Erro ao atualizar os campos do usuário", details: error})
    }
  }

  return {
    CountInfos,
    UsersInfo,
    UpdateUserAdmin
  };
};
