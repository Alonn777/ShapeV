import { useEffect, useState, useCallback, useMemo } from "react";
import { UsePost } from "../hooks/usePost";
import { UseGet } from "../hooks/useGet";
import { UseGetDiet } from "../hooks/useGetDiet";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import { data, useParams } from "react-router-dom";

const AddNutri = ({ BackDash, FoodInfos, SnackSection, SetDiet, token }) => {
  const { id } = useParams();
  const { CreateSnackFood, RefreshSnackDiary, SearchFood, SearchFoodServer  } = UseGetDiet();

  const [Food, SetFood] = useState([]);
  const [SearchValue, SetSearchValue] = useState("");
  const [SelectOriginal, SetOriginalSelected] = useState(null);
  const [SelectFood, SetSelectedFood] = useState(null);
  const [Multiplcate, SetMultiplicate] = useState(1);
  const [GramasTotal, SetGramasTotal] = useState(100);
  // const { SearchFoodServer, SearchFood } = UseGet();

  // 1 - Organizando requisições
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

  // 2 - Pesquisa de alimento
  const getDiet = async () => {
    try {
      const response = await RefreshSnackDiary(id, token);
      SetDiet(response);
    } catch (error) {
      console.error(error);
    }
  };
  const DebounceSearch = useCallback(
    debounce((NextValue) => SearchFood(NextValue, token), 1000),
    [SearchFood],
  );

  const HandleChange = (value) => {
    const NextValue = value;
    SetSearchValue(NextValue);
    DebounceSearch(NextValue);
  };

  // 3 - Funcionalidades de exibição
  const ExitButton = () => {
    BackDash(false);
  };

  const toggleCard = (item) => {
    SetOriginalSelected((prevSelected) =>
      prevSelected === item ? null : item,
    );
    SetSelectedFood((prevSelected) => (prevSelected === item ? null : item));
    SetMultiplicate(1);
  };

  // 3.1 - Duplicando valor com a quantidade de porções comidas
  useEffect(() => {
    const resultadoGramas = () => {
      if (!SelectOriginal) return;
      const factorNumber = Number(GramasTotal) / 100;
      SetSelectedFood(() => {
        return Object.fromEntries(
          Object.entries(SelectOriginal).map(([key, value]) => {
            if (key === "id" || key === "description" || key === "category") {
              return [key, value];
            }
            if (key === "portion_g") {
              return [key, Number(GramasTotal)];
            }
            if (typeof value === "number" && !isNaN(value)) {
              return [key, parseFloat((value * factorNumber).toFixed(4))];
            }

            return [key, value];
          }),
        );
      });
    };
    resultadoGramas();
  }, [GramasTotal, SelectOriginal]);

  const addNutrient = async (event) => {
    event.preventDefault();
    await CreateSnackFood(SnackSection, SelectFood, token);
    await getDiet();
    await BackDash(false);
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
          <div className="box-nutri">
            <label htmlFor="gramas">Quantidade de Gramas:</label>
            <input
              type="number"
              placeholder="EX: 50.5"
              min={0.05}
              step="0.01"
              value={GramasTotal}
              onChange={(e) => SetGramasTotal(e.target.value)}
            />
          </div>
          <p className="nutri-info">
            Total: {SelectFood.energy_kcal.toFixed(0)}kcal
          </p>
          <p className="nutri-info">Alimento: {SelectFood.description}</p>
          <button type="submit">Confirmar</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddNutri;
