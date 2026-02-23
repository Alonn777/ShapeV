import { useEffect, useState } from "react";
import { Pencil, ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/BodyData.css";
import { SessionStorage } from "../hooks/SessionStorage.jsx";
import { useBodyData } from "../hooks/useBodyData.jsx";
import GraphBodyData from "../components/GraphBodyData.jsx";

const BodyData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, getStorageUser } = SessionStorage();
  const token = data?.token;

  useEffect(() => {
    getStorageUser();
  }, []);

  const {
    BodyData,
    BodyMeta,
    createMetrica,
    BodyHistoricMetric,
    refreshBodyHistoric,
    refreshData,
    refreshMeta,
    createMeta,
    loading,
    savingMetrica,
    savingMeta,
    refreshing,
  } = useBodyData(id, token);
  // estados da aplicação
  const [Metricas, SetMetricas] = useState({});
  const [ActualMeta, SetActualMeta] = useState(null);
  const [DataGraph, SetDataGraph] = useState([]);

  useEffect(() => {
    if (BodyData) {
      SetMetricas(BodyData[0]);
    }

    if (BodyMeta) {
      SetActualMeta(BodyMeta[0]);
    }
    if (BodyHistoricMetric) {
      SetDataGraph(BodyHistoricMetric);
    }
  }, [BodyData, BodyMeta, BodyHistoricMetric]);

  const [weighSave, SetWeightSave] = useState(true);
  const [heightSave, SetHeightSave] = useState(true);
  const [metaSave, SetMetaSave] = useState(true);
  const [ImcValue, SetIMC] = useState(0);
  const [CategoryState, SetCategoryIMC] = useState(null);
  const [MetricaSave, SetMetricaSave] = useState(true);

  const BackHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (Metricas.weight && Metricas.height) {
      calcImc(Metricas.weight, Metricas.height);
    }
  }, [Metricas]);
  useEffect(() => {
    if (ImcValue) {
      CategoryIMC(ImcValue);
    }
  }, [ImcValue]);

  const calcImc = (weight, height) => {
    let imc = weight / (height * height);
    SetIMC(imc.toFixed(2));
  };

  const CategoryIMC = (imc) => {
    if (imc < 18.5)
      return SetCategoryIMC({
        category: "Abaixo do peso",
        InfoClass: "medium",
      });
    if (imc < 25)
      return SetCategoryIMC({
        category: "Peso normal",
        InfoClass: "good",
      });
    if (imc < 30)
      return SetCategoryIMC({
        category: "Sobrepeso",
        InfoClass: "low",
      });
    if (imc < 35)
      return SetCategoryIMC({
        category: "Obesidade grau I",
        InfoClass: "high",
      });
    if (imc < 40)
      return SetCategoryIMC({
        category: "Obesidade grau II",
        InfoClass: "ultra-high",
      });
    if (imc > 40)
      return SetCategoryIMC({
        category: "Obesidade grau III",
        InfoClass: "super-high",
      });
  };

  // onchange
  const handleChange = (field, e) => {
    SetMetricas((prev) => ({
      ...prev,
      [field]: e.target.value === "" ? null : Number(e.target.value),
    }));
  };
  const handleChangeMeta = (e) => {
    SetActualMeta((prev) => ({
      ...prev,
      weight_meta: e.target.value === "" ? null : Number(e.target.value),
    }));
  };

  // Submit métricas
  const WeightSubmit = async (e) => {
    e.preventDefault();
    await createMetrica(Metricas, token);
    await refreshData(token);
    await refreshBodyHistoric(token);
    SetWeightSave(true);
  };

  const HeightSubmit = async (e) => {
    e.preventDefault();
    await createMetrica(Metricas, token);
    await refreshData(token);
    SetHeightSave(true);
  };
  const MetricaSubmit = async (e) => {
    e.preventDefault();
    await createMetrica(Metricas, token);
    await refreshData(token);
    SetMetricaSave(true);
  };

  // Meta corporal
  const MetaSubmit = async (e) => {
    e.preventDefault();
    await createMeta(ActualMeta, token);
    await refreshMeta(token);
    SetMetaSave(true);
  };

  if (loading) {
    return (
      <div className="bodydata-layout">
        <div className="header-bodydata">
          <button type="button" className="home-back" onClick={BackHome}>
            <ArrowLeft /> <span>Voltar para home</span>
          </button>
          <h2>Dados Corporais</h2>
          <p>Monitore sua evolução física</p>
        </div>
        <div
          className="main-bodydata"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

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
                    placeholder="Ex: 75 KG"
                    value={Metricas.weight ?? ""}
                    min={0.05}
                    step="0.01"
                    required
                    onChange={(e) => handleChange("weight", e)}
                    disabled={savingMetrica || refreshing}
                  />
                  <button type="submit" disabled={savingMetrica || refreshing}>
                    {savingMetrica || refreshing ? (
                      <span>Salvando...</span>
                    ) : (
                      <Save color="#ffffffff" />
                    )}
                  </button>
                </form>
              )}
              {ActualMeta === null ? (
                <p>0 KG</p>
              ) : (
                <p className="meta-info"> Meta: {ActualMeta.weight_meta} KG</p>
              )}
            </div>

            <div className="info-box">
              <p className="subtitle">IMC</p>
              <p
                className={`imc-info ${
                  CategoryState ? CategoryState.InfoClass : ""
                }`}
              >
                {ImcValue}
              </p>
              {CategoryState ? (
                <p
                  className={`p-info ${
                    CategoryState ? CategoryState.InfoClass : ""
                  }`}
                >
                  {CategoryState.category}
                </p>
              ) : (
                <p>Categoria ainda indefinida</p>
              )}
            </div>

            <div className="info-box">
              <p className="subtitle">Altura atual</p>
              {heightSave ? (
                <div className="height">
                  {Metricas.height === null ? (
                    <p>0 CM</p>
                  ) : (
                    <p>{Metricas.height}M</p>
                  )}
                  <button onClick={() => SetHeightSave(false)} type="button">
                    <Pencil color="#fff" />
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => HeightSubmit(e)} className="height-form">
                  <input
                    type="number"
                    placeholder="Ex: 1.85M"
                    value={Metricas.height ?? ""}
                    onChange={(e) => handleChange("height", e)}
                    required
                    min={0.05}
                    step="0.01"
                    disabled={savingMetrica || refreshing}
                  />
                  <button type="submit" disabled={savingMetrica || refreshing}>
                    {savingMetrica || refreshing ? (
                      <span>Salvando...</span>
                    ) : (
                      <Save color="#ffffffff" />
                    )}
                  </button>
                </form>
              )}
              {ActualMeta === null ? (
                <p className="meta-info">0 KG</p>
              ) : (
                <p className="meta-info"> Meta: {ActualMeta.weight_meta} KG</p>
              )}
            </div>
          </div>

          <div className="meta-box">
            <p className="subtitle">Meta de peso</p>
            {metaSave ? (
              <div className="meta-info">
                <div className="meta-content">
                  {ActualMeta === null ? (
                    <p>0 KG</p>
                  ) : (
                    <p>{ActualMeta.weight_meta} KG</p>
                  )}
                  <button type="button" onClick={() => SetMetaSave(false)}>
                    <Pencil color="#ffff" />
                  </button>
                </div>
                <div className="meta-falta">
                  <p>Faltam</p>
                  {ActualMeta && Metricas ? (
                    <p className="meta-kg">
                      {Math.abs(
                        Metricas.weight - ActualMeta.weight_meta,
                      ).toFixed(2)}{" "}
                      KG
                    </p>
                  ) : (
                    <p className="meta-kg">0 KG</p>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => MetaSubmit(e)}>
                <input
                  type="number"
                  placeholder="Ex: 70"
                  value={ActualMeta.weight_meta ?? ""}
                  onChange={(e) => handleChangeMeta(e)}
                  min={0.05}
                  step="0.01"
                  required
                  disabled={savingMeta || refreshing}
                />
                <button type="submit" disabled={savingMeta || refreshing}>
                  {savingMeta || refreshing ? (
                    <span>Salvando...</span>
                  ) : (
                    <Save color="#ffff" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Gráfico dos dados corporais */}
        <GraphBodyData graphData={DataGraph} />
        {/* LOCAL DE MÉTRICAS DO USUÁRIO */}
        <div className="metrica-container"></div>
        {MetricaSave ? (
          <div className="metrica-box">
            <div className="header-metrica">
              <div className="title">
                <h3>Medidas Corporais</h3>
                <p>Circunferências em centímetros</p>
              </div>
              <button
                className="btn-metrica"
                onClick={() => SetMetricaSave(false)}
              >
                <span>
                  <Pencil />
                </span>
                Editar
              </button>
            </div>
            <div className="metricas">
              <div className="metrica-box">
                <label htmlFor="peito">Peito:</label>
                <div className="metrica-field">
                  {Metricas.chest === null ? (
                    <p>0 CM</p>
                  ) : (
                    <p>{Metricas.chest} CM</p>
                  )}
                </div>
              </div>
              <div className="metrica-box">
                <label htmlFor="Cintura">Cintura:</label>
                <div className="metrica-field">
                  {Metricas.waist === null ? (
                    <p>0 CM</p>
                  ) : (
                    <p>{Metricas.waist} CM</p>
                  )}
                </div>
              </div>
              <div className="metrica-box">
                <label htmlFor="Quadril">Quadril:</label>
                <div className="metrica-field">
                  {Metricas.chest === null ? (
                    <p>0 CM</p>
                  ) : (
                    <p>{Metricas.hip} CM</p>
                  )}
                </div>
              </div>
              <div className="metrica-box">
                <label htmlFor="Biceps">Biceps:</label>
                <div className="metrica-field">
                  {Metricas.biceps === null ? (
                    <p>0 CM</p>
                  ) : (
                    <p>{Metricas.biceps} CM</p>
                  )}
                </div>
              </div>
              <div className="metrica-box">
                <label htmlFor="Coxa">Coxa:</label>
                <div className="metrica-field">
                  {Metricas.thigh === null ? (
                    <p>0 CM</p>
                  ) : (
                    <p>{Metricas.thigh} CM</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="metrica-box" onSubmit={(e) => MetricaSubmit(e)}>
            <div className="header-metrica">
              <div className="title">
                <h3>Medidas Corporais</h3>
                <p>Circunferências em centímetros</p>
              </div>
              <button
                className="btn-metrica"
                type="submit"
                disabled={savingMetrica || refreshing}
              >
                <span>
                  {savingMetrica || refreshing ? (
                    <span>Salvando...</span>
                  ) : (
                    <Save />
                  )}
                </span>
                {savingMetrica || refreshing ? "" : "Salvar"}
              </button>
            </div>

            <div className="metricas">
              <div className="input-box">
                <label htmlFor="peito">Peito:</label>
                <input
                  type="number"
                  placeholder="Ex: 52"
                  value={Metricas.chest ?? ""}
                  onChange={(e) => handleChange("chest", e)}
                  min={0.05}
                  step="0.01"
                  disabled={savingMetrica || refreshing}
                />
              </div>

              <div className="input-box">
                <label htmlFor="Cintura">Cintura:</label>
                <input
                  type="number"
                  placeholder="Ex: 70"
                  value={Metricas.waist ?? ""}
                  onChange={(e) => handleChange("waist", e)}
                  min={0.05}
                  step="0.01"
                  disabled={savingMetrica || refreshing}
                />
              </div>
              <div className="input-box">
                <label htmlFor="Quadril">Quadril:</label>
                <input
                  type="number"
                  placeholder="Ex: 64"
                  value={Metricas.hip ?? ""}
                  onChange={(e) => handleChange("hip", e)}
                  min={0.05}
                  step="0.01"
                  disabled={savingMetrica || refreshing}
                />
              </div>
              <div className="input-box">
                <label htmlFor="biceps">Biceps:</label>
                <input
                  type="number"
                  placeholder="Ex: 38"
                  value={Metricas.biceps ?? ""}
                  onChange={(e) => handleChange("biceps", e)}
                  min={0.05}
                  step="0.01"
                  disabled={savingMetrica || refreshing}
                />
              </div>
              <div className="input-box">
                <label htmlFor="Coxa">Coxa:</label>
                <input
                  type="number"
                  placeholder="Ex: 62"
                  value={Metricas.thigh ?? ""}
                  onChange={(e) => handleChange("thigh", e)}
                  min={0.05}
                  step="0.01"
                  disabled={savingMetrica || refreshing}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BodyData;
