import { GlassWater, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsePost } from "../../hooks/usePost.jsx";
import { UseGet } from "../../hooks/useGet.jsx";
const WaterManage = (HidrateItem) => {
  // utilizando hooks seção
  const { id } = useParams();
  const HidraId = HidrateItem.HidrateItem.id;
  const { httpConfig } = UsePost(
    `http://localhost:3000/app/users/${id}/diets/${HidraId}`
  );
  const [Hidrate, SetHidrate] = useState({});
  const [cups, SetCups] = useState([]);

  useEffect(() => {
    SetHidrate(HidrateItem.HidrateItem);
    SetCups(HidrateItem.HidrateItem.hidration);
  }, [HidrateItem]);

  // Funções de requsição
    const UpdateState = async () => {
    const data = await fetch(`http://localhost:3000/app/users/${id}/diets`);
    const dataJSON = await data.json();
     dataJSON.filter((item)=> item.hidration)
     .map((item)=>{
      SetCups(item.hidration)
     })
    
  };

  const AddCup = () => {
    const cup = { drunk: false };
    httpConfig(cup, "POST")
    UpdateState()
  };
  return (
    <div className="hidration-content">
      <div className="icon-hidration">
        <GlassWater />
        <h3>Hidratação</h3>
      </div>
      <div className="main-hidration">
        <div className="subtitle">
          <p>Progresso do dia</p>
        </div>
        <div className="hidrate-progress">
          <div className="progress-fill"></div>
        </div>
        <div className="cups-box">
          {cups.length > 0
            ? cups.map((item) => (
                <div className="cup" key={item.id}>
                  <GlassWater />
                </div>
              ))
            : ""}
        </div>
        <button type="button" onClick={AddCup}>
          <span><Plus></Plus></span>
          Adicionar copo
        </button>
      </div>
    </div>
  );
};

export default WaterManage;
