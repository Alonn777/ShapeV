import { useState } from "react";

export const SessionStorage = () => {
  const [data, SetData] = useState();

  const storageUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  const getStorageUser = ()=>{
    const data = JSON.parse(localStorage.getItem("user"))
    SetData(data)
  }
  const deleteStorage = ()=>{
     localStorage.removeItem("users")
  }
 return {data, storageUser, getStorageUser, deleteStorage}
};
