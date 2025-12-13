import AddNutri from "./AddNutri";
import { UseGet } from "../../hooks/useGet";

import { Coffee, Utensils, Apple } from "lucide-react";
import { ChevronDown, ChevronUp, Pencil, Trash, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const SnackDiary = ({ SnackDiet }) => {
  const { GetFood, FoodServer } = UseGet();

  const [Food, SetFood] = useState([]);
  const [DietList, SetDiet] = useState([]);
  const [ViewNutrient, SetViewNutrient] = useState(false);
  const [kcalSnack, SetKcalSnack] = useState(0);
  const [SnackSectionID, SetSnackSection] = useState(null);

  useEffect(() => {
    if (FoodServer) {
      SetFood(FoodServer);
    }
  }, [FoodServer]);
  useEffect(() => {
    if (SnackDiet) {
      SetDiet(SnackDiet.SnackDiary);
    }
  }, [SnackDiet]);

  const ExpandCard = (id, expandBoolean) => {
    if (expandBoolean === false) {
      SetDiet((PrevDiet) =>
        PrevDiet.map((prev) =>
          prev.id === id ? { ...prev, ["expand"]: true } : { ...prev }
        )
      );
    } else {
      SetDiet((PrevDiet) =>
        PrevDiet.map((prev) =>
          prev.id === id ? { ...prev, ["expand"]: false } : { ...prev }
        )
      );
    }
  };

  const ViewCardAdd = (SectionID) => {
    if (ViewNutrient === false) {
      SetViewNutrient(true);
      GetFood("http://localhost:3000/taco");
      SetSnackSection(SectionID);
    }
  };
  const invisibleCard = () => {
    if (ViewNutrient === true) {
      SetViewNutrient(false);
    }
  };
  return (
    <div className="snack-box">
      {DietList &&
        DietList.map((snackitem) => (
          <div className="snack-card" key={snackitem.id}>
            <div
              className="name-snack"
              onClick={() => {
                ExpandCard(snackitem.id, snackitem.expand);
              }}
            >
              <div className="name-info">
                <div className="icon-coffe">
                  <Coffee color="#2da0ffff" />
                </div>
                <h3>{snackitem.name}</h3>
              </div>
              <div className="kcal-info">
                <div className="kcal">
                  <p> {kcalSnack} Kcal</p>
                  {snackitem.expand ? <ChevronDown /> : <ChevronUp />}
                </div>
                <p>3 Nutrientes</p>
              </div>
            </div>

            {/* Local dos alimentos */}
            {snackitem.expand ? (
              <div>
                {snackitem.SnackList.map((item) => (
                  <div className="snack-nutrients" key={item.id}>
                    <div className="nutrient-box">
                      <div className="nutrient-card">
                        <div className="name-nutrient">
                          <h4>{item.description}</h4>
                          <p>100g</p>
                        </div>

                        <div className="info-box">
                          <div className="info-nutrient">
                            <p className="kcal-nutri">
                              {Number(item.energy_kcal || 0).toFixed(0)}kcal
                            </p>
                            <p className="macro-info">
                              Proteina: {Number(item.protein_g || 0).toFixed(1)} |
                              Gordura: {Number(item.carbohydrate_g  || 0).toFixed(1)} |
                              Carboidrato: {Number(item.lipid_g || 0).toFixed(1)}
                            </p>
                          </div>

                          <div className="action-buttons">
                            <button type="button">
                              <Pencil color="#fff" />
                            </button>
                            <button type="button">
                              <Trash color="#f71818ff" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="add-nutrient"
                  onClick={() => ViewCardAdd(snackitem.id)}
                >
                  <span>
                    <Plus color="#ffff" />
                  </span>
                  Adicionar
                </button>
              </div>
            ) : (
              ""
            )}

            {ViewNutrient ? (
              <div className="search-container" onClick={ViewCardAdd}>
                <AddNutri
                  BackDash={SetViewNutrient}
                  FoodInfos={Food}
                  SnackSection={SnackSectionID}
                  SetDiet={SetDiet}
                />
                <div className="shadow-search" onClick={invisibleCard}></div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
    </div>
  );
};

export default SnackDiary;
