import { useEffect, useState } from "react";
import "../css/ResumoNutricional.css";

const ResumoNutricional = ({ SnackDiet }) => {
  const [DietList, SetDietList] = useState([]);
  const [BodyPlan, SetBodyPlan] = useState(null);
  const [KcalList, SetKcalList] = useState([]);
  const [Protein, SetProtein] = useState([]);
  const [Carboidrato, SetCarboidrato] = useState([]);
  const [Lipid, SetLipid] = useState([]);
  const [KcalPercentual, SetKcalPercentual] = useState(0);
  const [proteinPercentual, SetProteinPercentual] = useState(0);
  const [carboPercentual, SetCarboPercentual] = useState(0);
  const [LipidPercentual, SetLipidPercentual] = useState(0);

  // 1 - Renderizando os dados
  useEffect(() => {
    if (SnackDiet) {
      SetDietList(SnackDiet);
    }
  }, [SnackDiet]);

  useEffect(() => {
    const Caloria_array = [];
    const Proteina_array = [];
    const Carbo_array = [];
    const Lipid_array = [];

    DietList.map((SnackItem) => {
      const KcalValue = SnackItem.Snack_List.reduce(
        (acc, item) => acc + Number(item.energy_kcal.toFixed(0) || 0),
        0,
      );

      const ProteinaValue = SnackItem.Snack_List.reduce(
        (acc, item) => acc + Number(item.protein_g.toFixed(0) || 0),
        0,
      );

      const CarboValue = SnackItem.Snack_List.reduce(
        (acc, item) => acc + Number(item.carbohydrate_g.toFixed(0) || 0),
        0,
      );

      const Lipid = SnackItem.Snack_List.reduce(
        (acc, item) => acc + Number(item.lipid_g.toFixed(0) || 0),
        0,
      );
      Caloria_array.push(KcalValue);
      Proteina_array.push(ProteinaValue);
      Carbo_array.push(CarboValue);
      Lipid_array.push(Lipid);
    });

    if (Caloria_array.length > 1) {
      SetKcalList(Caloria_array);
    }
    if (Proteina_array.length > 1) {
      SetProtein(Proteina_array);
    }
    if (Carbo_array.length > 1) {
      SetCarboidrato(Carbo_array);
    }

    if (Lipid_array.length > 1) {
      SetLipid(Lipid_array);
    }
  }, [DietList]);

  useEffect(() => {
    const percentualResume = () => {
      const kcalValue = KcalList.reduce((acc, item) => acc + item, 0);
      const proteinValue = Protein.reduce((acc, item) => acc + item, 0);
      const carboValue = Protein.reduce((acc, item) => acc + item, 0);
      const lipidValue = Protein.reduce((acc, item) => acc + item, 0);

      if (BodyPlan) {
        const percentualKcal = (kcalValue / BodyPlan.kcal) * 100;
        SetKcalPercentual(percentualKcal.toFixed(0));
        const percentualProtein = (proteinValue / BodyPlan.protein) * 100;
        SetProteinPercentual(percentualProtein);

        const CarboPercentual = (carboValue / BodyPlan.protein) * 100;
        SetCarboPercentual(CarboPercentual);

        const LipidPercentual = (lipidValue / BodyPlan.protein) * 100;
        SetLipidPercentual(LipidPercentual);
      }
    };
    percentualResume();
  }, [KcalList, BodyPlan]);

  // Funcionalidade da evolução corporal

  const BtnBodyPlan = (type) => {
    if (type === "growth") {
      const value = {
        type: "growth",
        kcal: 2800,
        protein: 180,
        carbo: 350,
        lipid: 80,
      };
      SetBodyPlan(value);
    }
    if (type === "stay") {
      const value = {
        type: "stay",
        kcal: 2200,
        protein: 140,
        carbo: 250,
        lipid: 70,
      };
      SetBodyPlan(value);
    }
    if (type === "lose") {
      const value = {
        type: "lose",
        kcal: 1800,
        protein: 150,
        carbo: 150,
        lipid: 55,
      };
      SetBodyPlan(value);
    }
  };

  return (
    <div>
      <div className="plan-progress-header">
        <button
          className="btn-progress"
          style={
            BodyPlan && BodyPlan.type === "growth"
              ? { backgroundColor: "#071e38" }
              : {}
          }
          onClick={() => BtnBodyPlan("growth")}
        >
          Ganhar massa
        </button>
        <button
          className="btn-progress"
          style={
            BodyPlan && BodyPlan.type === "stay"
              ? { backgroundColor: "#071e38" }
              : {}
          }
          onClick={() => BtnBodyPlan("stay")}
        >
          Manter peso
        </button>
        <button
          className="btn-progress"
          style={
            BodyPlan && BodyPlan.type === "lose"
              ? { backgroundColor: "#071e38" }
              : {}
          }
          onClick={() => BtnBodyPlan("lose")}
        >
          Perder peso
        </button>
      </div>
      <div className="nutricional-box">
        <h2>Resumo Nutricional:</h2>
        <div className="kcal-box">
          <div className="kcal-header">
            <p className="subtitle">Calorias</p>
            <p>
              {KcalList.length > 1
                ? KcalList.reduce((acc, item) => acc + item, 0)
                : 0}
              / {BodyPlan ? BodyPlan.kcal : 0} kcal
            </p>
          </div>
          <div className="kcal-graph">
            <div
              className="kcal-fill"
              style={{ width: `${KcalPercentual}%` }}
            ></div>
          </div>
        </div>

        <div className="other-nutris">
          <div className="info-nutri-box">
            <div className="info-nutri-header">
              <p>Proteína</p>
              <p>
                {Protein.length > 1
                  ? Protein.reduce((acc, item) => acc + item, 0)
                  : 0}
                g
              </p>
            </div>
            <div className="info-nutri-graph">
              <div
                className="info-nutri-fill"
                style={{ width: `${proteinPercentual}%` }}
              ></div>
            </div>
            <p className="gramas-final"> {BodyPlan ? BodyPlan.protein : 0} G</p>
          </div>

          <div className="info-nutri-box">
            <div className="info-nutri-header">
              <p>Carboidrato</p>
              <p>
                {Carboidrato.length > 1
                  ? Carboidrato.reduce((acc, item) => acc + item, 0)
                  : 0}
                g
              </p>
            </div>
            <div className="info-nutri-graph">
              <div
                className="info-nutri-fill"
                style={{ width: `${carboPercentual}%` }}
              ></div>
            </div>
            <p className="gramas-final">{BodyPlan ? BodyPlan.carbo : 0} G</p>
          </div>

          <div className="info-nutri-box">
            <div className="info-nutri-header">
              <p>Gordura</p>
              <p>
                {Lipid.length > 1
                  ? Lipid.reduce((acc, item) => acc + item, 0)
                  : 0}
                g
              </p>
            </div>
            <div className="info-nutri-graph">
              <div
                className="info-nutri-fill"
                style={{ width: `${LipidPercentual}%` }}
              ></div>
            </div>
            <p className="gramas-final">{BodyPlan ? BodyPlan.lipid : 0} G</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumoNutricional;
