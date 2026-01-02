import { useState } from "react";
import { Pencil, Plus, ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const BodyData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // estados da aplicação
  const [weighSave, SetWeightSave] = useState(false);
  const [heightSave, SetHeightSave] = useState(false);

  const BackHome = () => {
    navigate("/home");
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
            <div className="weight-box">
              <p className="subtitle">Peso atual</p>
              {weighSave ? (
                <div>
                  <p className="weight-info">76kg</p>
                  <button type="button">
                    <Pencil />
                  </button>
                </div>
              ) : (
                <form>
                  <input type="number" placeholder="75" value="0" />
                  <button type="submit">
                    <Save />
                  </button>
                </form>
              )}
              <p className="meta-info">meta: 72kg</p>
            </div>
            <div className="imc">
              <p className="subtitle">IMC</p>
              <p className="imc-info">30.1</p>
              <p>Peso saúdavel</p>
            </div>

            <div className="height-box">
              <p className="subtitle">Altura atual</p>
              {heightSave ? (
                <div>
                  <p className="weight-info">76kg</p>
                  <button type="button">
                    <Pencil />
                  </button>
                </div>
              ) : (
                <form>
                  <input type="number" placeholder="75" value="0" />
                  <button type="submit">
                    <Save />
                  </button>
                </form>
              )}
              <p className="meta-info">meta: 72kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyData;
