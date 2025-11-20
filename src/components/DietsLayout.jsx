import "../css/DietsLayout.css";
import WaterManage from "./subcomponents/WaterManage";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Calendar, Plus, ArrowLeft } from "lucide-react";
import { UseGet } from "../hooks/useGet";
import { useEffect, useState } from "react";

const DietsLayout = () => {
  // Request dos dados da dieta
  const navigate = useNavigate();
  const { id } = useParams();
  const { DietServer } = UseGet(`http://localhost:3000/app/users/${id}/diets`);

  useEffect(() => {
    if (DietServer) {
      SetDietData(DietServer);
    }
  }, [DietServer]);

  const [DietData, SetDietData] = useState([]);

  // configurando o dia da semana
  const date = new Date();
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const DataElement = `${day} de ${monthName}, ${year}`;

  const BackHome = () => {
    navigate("/home");
  };

  console.log(DietServer)
  return (
    <div className="Diet-Layout">
      <button type="button" className="home-back" onClick={BackHome}>
        <ArrowLeft /> <span>Voltar para home</span>
      </button>
      <div className="Diet-header">
        <div className="day-box">
          <div className="calendar">
            <Calendar />
          </div>
          <div className="day">
            <h2>Hoje</h2>
            <p>{DataElement}</p>
          </div>
        </div>
        <div className="action-header">
          <button type="button">
            <span>
              <Search />
            </span>
            Buscar alimento
          </button>
          <button type="button">
            <span>
              <Plus />
            </span>
            Nova refeição
          </button>
        </div>
      </div>

      <div className="main-diet">
        <div className="nutrition-container">
          <h3>Resumo Nutricional</h3>
        </div>

        <div className="hidatration-container">
          {DietData.length > 0 ? ( 
            DietData.filter((item)=> item.hidration)
            .map((item) => {
              return <WaterManage HidrateItem={item}/>
            })) : (<p>Carregando os dados...</p>)
          }
        </div>

        <div className="meal-container">
          <h3>Diario de refeições</h3>
        </div>
        <div className="fast-cardap"></div>
      </div>
    </div>
  );
};

export default DietsLayout;
