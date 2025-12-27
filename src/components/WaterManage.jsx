import { GlassWater, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsePost } from "../hooks/usePost.jsx";
import { UsePut } from "../hooks/usePut.jsx";

const WaterManage = ({ HidrateItem }) => {
  // utilizando hooks seção
  const { id } = useParams();
  const DietID = HidrateItem.id;
  const { httpConfig } = UsePost(
    `http://localhost:3000/users/diets/hidrate/${id}`
  );
  const { UpdatePut } = UsePut();

  const [Diet, SetDiet] = useState({});
  const [cups, SetCups] = useState([]);
  const [CupDrunk, SetCupDrunk] = useState(0);
  const [percentual, SetPercentual] = useState(0);

  useEffect(() => {
    SetCups(HidrateItem)
  }, [HidrateItem]);

  useEffect(() => {
    if (cups) {
      const total = cups.filter((c) => c.drunk).length;
      SetCupDrunk(total);
    }
  }, [cups]);

  useEffect(() => {
      const percentualDrunk = (CupDrunk / cups.length) * 100;
      const PercentualFormated = percentualDrunk.toFixed(0);
      SetPercentual(PercentualFormated)
  }, [CupDrunk]);

  // Funções de requsição
  const UpdateState = async () => {
    const response = await fetch(`http://localhost:3000/users/diets/hidrate/${id}`);
    const data = await response.json();
    SetCups(data)
  };

  const AddCup = () => {
    const cup = { drunk: false };
    httpConfig(cup, "POST");
    UpdateState();
  };
  const updateCup = (Cup) => {
    const CupId = Cup.id;
    const CurrentCup = Cup.drunk;
    const DrunkTrue = { drunk: true };
    const DrunkFalse = { drunk: false };

    
    if (CurrentCup === false) {
      UpdatePut(
        `http://localhost:3000/users/diets/hidrate/cup/${CupId}`,
        DrunkTrue
      );
      UpdateState();
    }
    if (CurrentCup === true) {
      UpdatePut(
        `http://localhost:3000/users/diets/hidrate/cup/${CupId}`,
        DrunkFalse
      );
      UpdateState();
    }
  };
  return (
    <div className="hidration-content">
      <div className="icon-hidration">
        <GlassWater />
        <h3>Hidratação</h3>
      </div>
      <div className="main-hidration">
        <div className="info-header">
          <p>Progresso do dia</p>

          {cups && (
            <p>
              {CupDrunk}/{cups.length} copos{" "}
            </p>
          )}
        </div>
        <div className="hidrate-progress">
          <div
            className="progress-fill"
            style={{ width: `${percentual}%` }}
          ></div>
        </div>
         <div className="cups-box">
           {cups
            ? cups.map((item) => (
                <div
                  className={`cup ${item.drunk ? "active" : ""}`}
                  key={item.id}
                  onClick={() => updateCup(item)}
                >
                  <GlassWater />
                </div>
              ))
            : ""} 
        </div> 
        <button type="button" onClick={AddCup}>
          <span>
            <Plus></Plus>
          </span>
          Adicionar copo
        </button>
      </div>
    </div>
  );
};

export default WaterManage;
