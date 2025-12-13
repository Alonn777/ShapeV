import { useEffect, useState, useCallback } from "react";
import { UsePost } from "../../hooks/usePost";
import { UseGet } from "../../hooks/useGet";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import { data, useParams } from "react-router-dom";

const AddNutri = ({ BackDash, FoodInfos, SnackSection, SetDiet}) => {
  const { id } = useParams();
  const { httpConfig } = UsePost(
    `http://localhost:3000/users/${id}/diets/${SnackSection}/SnackDiary`
  );

  const [Food, SetFood] = useState([]);
  const [SearchValue, SetSearchValue] = useState("");
  const [SelectOriginal, SetOriginalSelected] = useState(null);
  const [SelectFood, SetSelectedFood] = useState(null);
  const [Multiplcate, SetMultiplicate] = useState(1);
  const { SearchFoodServer, SearchFood } = UseGet();

  // Manipulando os dados
  useEffect(() => {
    if (FoodInfos) {
      SetFood(FoodInfos);
    }
  }, [FoodInfos]);
  useEffect(() => {
    if (SearchFoodServer) {
      SetFood(SearchFoodServer);
    }
  }, [SearchFoodServer]);
// funcionalidades de requisição 
  const getDiet = async ()=>{
    const requestDiet = await fetch(`http://localhost:3000/users/${id}/diets`)
    const dietJson = await requestDiet.json()
    SetDiet(dietJson.SnackDiary)
  }
  const DebounceSearch = useCallback(
    debounce((NextValue) => SearchFood(NextValue), 1000),
    [SearchFood]
  );
  const HandleChange = (value) => {
    const NextValue = value;
    SetSearchValue(NextValue);
    DebounceSearch(NextValue);
  };

  //   Funcionalidades de exibição
  const ExitButton = () => {
    BackDash(false);
  };

  const toggleCard = (item) => {
    SetOriginalSelected((prevSelected) =>
      prevSelected === item ? null : item
    );
    SetSelectedFood((prevSelected) => (prevSelected === item ? null : item));
    SetMultiplicate(1);
  };
  const handleChange = (n) => {
    if (n === "") {
      SetMultiplicate("");
      return;
    }

    const number = Number(n);

    if (number < 1 || isNaN(number)) return;
    SetMultiplicate(number);
    SetSelectedFood(() => {
      return Object.fromEntries(
        Object.entries(SelectOriginal).map(([key, value]) => {
          if (key === "id") {
            return [key, value];
          }

          return [key, typeof value === "number" ? value * number : value];
        })
      );
    });
  };
  const addNutrient = (event) => {
    event.preventDefault();
    httpConfig(SelectFood, 'POST')
    getDiet()
    setTimeout(()=> BackDash(false), 400)
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

        {Food.length > 0 ? (
          Food.map((foodItem) => (
            <div
              className={`nutri-card ${
                SelectOriginal === foodItem ? `active` : ``
              }`}
              onClick={() => toggleCard(foodItem)}
              key={foodItem.id}
            >
              <div className="nutri-name">
                <h3>{foodItem.description}</h3>
                <p>100g</p>
              </div>
              <div className="nutri-infos">
                <p className="kcal">
                  {Number(foodItem.energy_kcal || 0).toFixed(0)} Kcal
                </p>
                <p className="other-info">
                  P: {Number(foodItem.protein_g || 0).toFixed(1)} | C:
                  {Number(foodItem.carbohydrate_g || 0).toFixed(1)} | G:
                  {Number(foodItem.lipid_g || 0).toFixed(1)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando..</p>
        )}
      </div>
      {SelectOriginal ? (
        <form className="form-addNutri" onSubmit={(e) => addNutrient(e)}>
          <div className="amount-nutri">
            <label htmlFor="amount">Quantidade:</label>
            <input
              type="number"
              placeholder="1"
              name="amount"
              value={Multiplcate}
              onChange={(e) => handleChange(e.target.value)}
              min={1}
              required
            />
          </div>
          <p className="amount-kcal">
            Total: {SelectFood.energy_kcal.toFixed(0)}kcal
          </p>
          <button type="submit">Confirmar</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddNutri;
