import { Coffee } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SnackDiary = () => {
  const [Expand, SetExpand] = useState(false);
  return (
    <div className="snack-box">

      <div className="snack-card">
        <div className="name-snack">
          <div className="name-info">
            <div className="icon-coffe">
              <Coffee />
            </div>
            <h3>Café da manhã</h3>
          </div>
          <div className="kcal-info">
            <div className="kcal">
              <p>375 Kcal</p>
              <ChevronDown />
            </div>
            <p>3 Nutrientes</p>
          </div>
        </div>

        {Expand ? (
          <div className="snack-nutrients">
            <div className="nutriente-box"></div>
            <button type="button"> Adicionar</button>
          </div>
        ) : (
          ""
        )}
      </div>
      
      <div className="snack-card">
        <div className="name-snack">
          <div className="name-info">
            <div className="icon-coffe">
              <Coffee />
            </div>
            <h3>Café da manhã</h3>
          </div>
          <div className="kcal-info">
            <div className="kcal">
              <p>375 Kcal</p>
              <ChevronDown />
            </div>
            <p>3 Nutrientes</p>
          </div>
        </div>

        {Expand ? (
          <div className="snack-nutrients">
            <div className="nutriente-box"></div>
            <button type="button"> Adicionar</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SnackDiary;
