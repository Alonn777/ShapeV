import { useEffect, useState, useCallback, useMemo } from "react";
import { UsePost } from "../hooks/usePost";
import { UseGet } from "../hooks/useGet";
import { UseGetDiet } from "../hooks/useGetDiet";
import debounce from "lodash.debounce";
import { X, Plus } from "lucide-react";
import Loader from "./Loader.jsx";
import { useParams } from "react-router-dom";

/**
 * @typedef {Object} FoodItem
 * @property {string|number} id
 * @property {string} [description]
 * @property {string} [category]
 * @property {number} [energy_kcal]
 * @property {number} [protein_g]
 * @property {number} [carbohydrate_g]
 * @property {number} [lipid_g]
 * @property {number} [portion_g]
 */

const AddNutri = ({
  BackDash,
  FoodInfos,
  SnackSection,
  SetDiet,
  token,
  SetViewNutrient,
  SetNewNutrient,
}) => {
  const { id } = useParams();
  const { CreateSnackFood, RefreshSnackDiary, SearchFood, SearchFoodServer } =
    UseGetDiet();

  const [Food, SetFood] = useState([]);
  const [SearchValue, SetSearchValue] = useState("");
  /** ID estável do card selecionado (evita === entre objetos quando a lista recarrega). */
  const [selectedFoodId, setSelectedFoodId] = useState(null);
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
    setSelectedFoodId((prev) => (prev === item.id ? null : item.id));
    SetMultiplicate(1);
  };

  const HandleCreate = () => {
    SetViewNutrient(false);
    SetNewNutrient(true);
  };
  const SelectOriginal = useMemo(() => {
    if (selectedFoodId == null) return null;
    return Food.find((f) => f.id === selectedFoodId) ?? null;
  }, [Food, selectedFoodId]);

  const SelectFood = useMemo(() => {
    if (!SelectOriginal) return null;
    const factorNumber = Number(GramasTotal) / 100;
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
  }, [GramasTotal, SelectOriginal]);

  useEffect(() => {
    if (selectedFoodId == null) return;
    if (!Food.some((f) => f.id === selectedFoodId)) {
      setSelectedFoodId(null);
    }
  }, [Food, selectedFoodId]);

  const addNutrient = async (event) => {
    event.preventDefault();
    if (!SelectFood) return;
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
      <div className="Nutri-actions">
        <button onClick={HandleCreate} className="btn-action">
          <span>
            <Plus />
          </span>
          Criar alimento
        </button>
      </div>
      <div className="food-sugestion">
        <p>Alimentos abaixo</p>

        {Food.length > 0 ? (
          Food.map((foodItem) => (
            <div
              className={`nutri-card ${
                selectedFoodId === foodItem.id ? `active` : ``
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
          <Loader />
        )}
      </div>
      {SelectOriginal && SelectFood ? (
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
            Total: {Number(SelectFood.energy_kcal ?? 0).toFixed(0)}kcal
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
