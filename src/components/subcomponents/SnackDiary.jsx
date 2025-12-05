import { Coffee, Utensils, Apple } from "lucide-react";
import { ChevronDown, ChevronUp, Pencil, Trash, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { UseGet } from "../../hooks/useGet";

const SnackDiary = ({ SnackDiet }) => {
  const [DietList, SetDiet] = useState([]);
  const [kcalSnack, SetKcalSnack] = useState(0);

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

  return (
    <div className="snack-box">
      {DietList &&
        DietList.map((snackitem) => (
          <div
            className="snack-card"
            onClick={() => ExpandCard(snackitem.id, snackitem.expand)}
            key={snackitem.id}
          >
            <div className="name-snack">
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
              <div className="snack-nutrients">
                <div className="nutrient-box">
                  <div className="nutrient-card">
                    <div className="name-nutrient">
                      <h4>Aveia</h4>
                      <p>50g</p>
                    </div>

                    <div className="info-box">
                      <div className="info-nutrient">
                        <p className="kcal-nutri">50kcal</p>
                        <p className="macro-info">
                          Proteina: | Gordura: | Carboidrato:{" "}
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

                  <div className="nutrient-card">
                    <div className="name-nutrient">
                      <h4>Aveia</h4>
                      <p>50g</p>
                    </div>
                    <div className="info-box">
                      <div className="info-nutrient">
                        <p className="kcal-nutri">50kcal</p>
                        <p className="macro-info">
                          Proteina: | Gordura: | Carboidrato:{" "}
                        </p>
                      </div>

                      <div className="action-buttons">
                        <button type="button">
                          <Pencil />
                        </button>
                        <button type="button">
                          <Trash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button type="button" className="add-nutrient">
                  <span>
                    <Plus color="#ffff" />
                  </span>
                  Adicionar
                </button>
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
