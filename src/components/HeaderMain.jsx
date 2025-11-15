import React from "react";
import { PanelsTopLeft } from "lucide-react";
import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import '../css/HeaderMain.css'
const HeaderMain = () => {
  return (
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
              <Search color="#ffff"/>
            </button>
          </form>
        </div>
      </div>
      <div className="header-user-box">
        <button className="notification-user">
          <Bell color="#ffff"/>
        </button>
      </div>
    </header>
  );
};

export default HeaderMain;
