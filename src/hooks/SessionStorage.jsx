import { useState } from "react";

export const SessionStorage = () => {
  const [data, SetData] = useState(null);

  const storageUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  const getStorageUser = ()=>{
    const data = JSON.parse(sessionStorage.getItem("user"))
    SetData(data)
  }
  const deleteStorage = ()=>{
     sessionStorage.removeItem("user")
  }
 return {data, storageUser, getStorageUser, deleteStorage}
};
