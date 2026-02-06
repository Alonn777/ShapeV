import React, { useEffect } from "react";
import { Search, CircleUser, Bell, PanelsTopLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SessionStorage } from "../hooks/SessionStorage.jsx";
import "../css/HeaderMain.css";
const HeaderMain = () => {
  const { getStorageUser, data } = SessionStorage();
  const [AppInfos, SetAppInfos] = useState(false);
  const userRole = data?.role;

  useEffect(() => {
    getStorageUser();
  }, []);

  const handleUser = ()=>{
    if(AppInfos === false){
      SetAppInfos(true)
    }
    else{
      SetAppInfos(false)
    }
  }
  return (
    <>
      <header className="muscle-search">
        <div className="search-box">
          <button className="navbar-button">
            <PanelsTopLeft color="#ffff" />
          </button>
          <div className="search-form">
            <form>
              <input
                type="text"
                placeholder="Pesquise um exercicio por músculo!"
              />
              <button className="search-button">
                <Search color="#ffff" />
              </button>
            </form>
          </div>
        </div>
        <div className="header-user-box">
          <button className="user" >
            <Bell size={30} color="#ffff" />
          </button>
          <button className="user" onClick={handleUser}>
            <CircleUser size={30} color="#fff" />
          </button>
        </div>
      </header>
      {AppInfos ? (
        <div className="app-infos">
          <ul>
            <Link to={"/config"}>Configurações</Link>
            {userRole === "admin" && <Link to={"/admin"}>Painel de admin</Link>}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HeaderMain;
