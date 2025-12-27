import { useEffect, useState, useCallback } from "react";
import { UseGet } from "../hooks/useGet";
import debounce from "lodash.debounce";
import { X } from "lucide-react";

const SearchNutri = ({ ChangeDiet, FoodInfos }) => {
  const [Food, SetFood] = useState([]);
  const [SearchValue, SetSearchValue] = useState("");
  const { SearchFoodServer, SearchFood } = UseGet();

  useEffect(() => {
    if (FoodInfos) {
      SetFood(FoodInfos);
    }
  }, [FoodInfos]);
  useEffect(()=>{
    if(SearchFoodServer){
      SetFood(SearchFoodServer)
    }
  }, [SearchFoodServer])

const DebounceSearch = useCallback(
  debounce((NextValue)=> SearchFood(NextValue), 1000),
  [SearchFood]
)
  const HandleChange = (value) => {
    const NextValue = value;
    SetSearchValue(NextValue);
    DebounceSearch(NextValue)
  };
  const ExitButton = () => {
    ChangeDiet(false);
  };
  return (
    <div className="search-content">
      <div className="icon-field">
        <button type="button" className="btn-exit" onClick={ExitButton}>
          <X color="#dddd" />
        </button>
      </div>
      <form className="search-area">
        <label htmlFor="search">Busca por alimento:</label>
        <input
          type="text"
          value={SearchValue}
          placeholder="Pesquise o seu alimento"
          onChange={(e) => HandleChange(e.target.value)}
        />
      </form>
      <div className="food-sugestion">
        <p>Alimentos abaixo</p>

        {
       Food.length > 0 ? 
        Food.map((foodItem) => (
          <div className="nutri-card" key={foodItem.id}>
            <div className="nutri-name">
              <h3>{foodItem.description}</h3>
              <p>100g</p>
            </div>
            <div className="nutri-infos">
              <p className="kcal">{Number(foodItem.energy_kcal || 0).toFixed(0)} Kcal</p>
              <p className="other-info">
                P: {Number(foodItem.protein_g || 0).toFixed(1)} | C:
                {Number(foodItem.carbohydrate_g || 0).toFixed(1)} | G:
                {Number(foodItem.lipid_g || 0).toFixed(1)}
              </p>
            </div>
          </div>
        ))
      : (<p>Carregando..</p>)
      }
      </div>
    </div>
  );
};

export default SearchNutri;
