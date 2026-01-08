import { useEffect, useState } from "react";
import { Pencil, Plus, ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/BodyData.css";
import { UseGet } from "../hooks/useGet.jsx";
import { useBodyData } from "../hooks/useBodyData.jsx";

const BodyData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { BodyData, createMetrica } = useBodyData(id);
  // estados da aplicação

  const [Metricas, SetMetricas] = useState({});
  useEffect(() => {
    if (BodyData) {
      SetMetricas(BodyData[0]);
    }
  }, [BodyData]);
  const [weighSave, SetWeightSave] = useState(true);
  const [heightSave, SetHeightSave] = useState(true);
  const [metaSave, SetMetaSave] = useState(true);

  const BackHome = () => {
    navigate("/home");
  };
  // onchange
  const handleHeightChange = (e) => {
    if (e.target.value === "") {
      SetMetricas((prev) => ({
        ...prev,
        height: "",
      }));
      return;
    }
    SetMetricas((prev) => ({
      ...prev,
      height: Number(e.target.value),
    }));
  };
  const handleWeightChange = (e) => {
    if (e.target.value === "") {
      SetMetricas((prev) => ({
        ...prev,
        weight: "",
      }));
      return;
    }
    SetMetricas((prev) => ({
      ...prev,
      weight: Number(e.target.value),
    }));
  };

  // Submit métricas
  const WeightSubmit = (e) => {
    e.preventDefault();
    createMetrica(Metricas);
  };

  return (
    <div className="bodydata-layout">
      <div className="header-bodydata">
        <button type="button" className="home-back" onClick={BackHome}>
          <ArrowLeft /> <span>Voltar para home</span>
        </button>
        <h2>Dados Corporais</h2>
        <p>Monitore sua evolução física</p>
      </div>

      <div className="main-bodydata">
        <div className="body-statics">
          <div className="imc-container">
            <div className="info-box">
              <p className="subtitle">Peso atual</p>
              {weighSave ? (
                <div className="weight">
                  {Metricas.weight === null ? (
                    <p>0 KG</p>
                  ) : (
                    <p>{Metricas.weight} KG</p>
                  )}
                  <button onClick={() => SetWeightSave(false)} type="button">
                    <Pencil color="#fff" />
                  </button>
                </div>
              ) : (
                <form className="weight-form" onSubmit={(e) => WeightSubmit(e)}>
                  <input
                    type="number"
                    placeholder="75"
                    value={Metricas.weight ?? ""}
                    min={1}
                    onChange={(e) => handleWeightChange(e)}
                  />
                  <button type="submit">
                    <Save color="#ffffffff" />
                  </button>
                </form>
              )}
              <p className="meta-info">Meta: 72kg</p>
            </div>

            <div className="info-box">
              <p className="subtitle">IMC</p>
              <p className="imc-info">30.1</p>
              <p>Peso saúdavel</p>
            </div>

            <div className="info-box">
              <p className="subtitle">Altura atual</p>
              {heightSave ? (
                <div className="height">
                  {Metricas.height === null ? (
                    <p>0 KG</p>
                  ) : (
                    <p>{Metricas.weight} KG</p>
                  )}
                  <button onClick={() => SetHeightSave(false)} type="button">
                    <Pencil color="#fff" />
                  </button>
                </div>
              ) : (
                <form className="height-form">
                  <input
                    type="number"
                    placeholder="75"
                    value={Metricas.height ?? ""}
                    onChange={(e) => handleHeightChange(e)}
                    min={1}
                  />
                  <button type="submit">
                    <Save color="#ffffffff" />
                  </button>
                </form>
              )}
              <p className="meta-info">Meta: 72kg</p>
            </div>
          </div>

          <div className="meta-box">
            <p className="subtitle">Meta de peso</p>
            {metaSave ? (
              <div className="meta-info">
                <h3>72 kg</h3>
                <button type="button" onClick={() => SetMetaSave(false)}>
                  <Pencil color="#ffff" />
                </button>
              </div>
            ) : (
              <form>
                <input type="number" placeholder="Sua meta de peso!" />
                <button type="submit">
                  <Save color="#ffff" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyData;
