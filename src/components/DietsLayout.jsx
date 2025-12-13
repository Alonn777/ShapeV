import "../css/DietsLayout.css";
import WaterManage from "./subcomponents/WaterManage";
import SnackDiary from "./subcomponents/SnackDiary.jsx";
import SearchNutri from "./subcomponents/SearchNutri.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Calendar, Plus, ArrowLeft, Utensils } from "lucide-react";
import { UseGet } from "../hooks/useGet";
import { useEffect, useState } from "react";

const DietsLayout = () => {
  // Request dos dados da dieta
  const navigate = useNavigate();
  const { id } = useParams();
  const { DietServer, GetFood, FoodServer } = UseGet(
    `http://localhost:3000/users/${id}/diets`
  );

  useEffect(() => {
    if (DietServer) {
      SetDietData(DietServer);
    }
  }, [DietServer]);

  // States para controlar a aplicação
  const [DietData, SetDietData] = useState({});
  const [SearchDiet, SetSearchDiet] = useState(false);

  // configurando o dia da semana
  const date = new Date();
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const DataElement = `${day} de ${monthName}, ${year}`;

  const BackHome = () => {
    navigate("/home");
  };

  const ChangeSearchDiet = () => {
    SetSearchDiet(true);
    GetFood("http://localhost:3000/taco");
  };
  const ModalClick = () => {
    SetSearchDiet(false);
  };
  return (
    <main className="Diet-Layout">
      <button type="button" className="home-back" onClick={BackHome}>
        <ArrowLeft /> <span>Voltar para home</span>
      </button>

      <header className="Diet-header">
        <div className="day-box">
          <div className="calendar">
            <Calendar size={30} />
          </div>
          <div className="day">
            <h2>Hoje</h2>
            <p>{DataElement}</p>
          </div>
        </div>
        <div className="action-header">
          <button
            type="button"
            className="Search-food"
            onClick={ChangeSearchDiet}
          >
            <span>
              <Search color="#f5f5f5" />
            </span>
            Buscar alimento
          </button>
          <button type="button" className="Create-snack">
            <span>
              <Plus />
            </span>
            Nova refeição
          </button>
        </div>
      </header>

      {SearchDiet ? (
        <section className="search-container">
          <SearchNutri ChangeDiet={SetSearchDiet} FoodInfos={FoodServer} />
          <div className="shadow-search" onClick={ModalClick}></div>
        </section>
      ) : (
        ""
      )}
      <div className="main-diet">
        <section className="nutrition-container">
          <h3>Resumo Nutricional</h3>
        </section>

        <section className="hidatration-container">
          {DietData ? (
            <WaterManage HidrateItem={DietData} />
          ) : (
            <p>Carregando os dados...</p>
          )}
        </section>

        <section className="snack-container">
          <header className="title">
              <Utensils color="#f5f5f5" />
          
            <h3>Diário de refeições</h3>
          </header>
          <SnackDiary SnackDiet={DietData} />
        </section>
        <div className="fast-cardap"></div>
      </div>
    </main>
  );
};

export default DietsLayout;
