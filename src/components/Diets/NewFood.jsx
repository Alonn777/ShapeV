import React, { use } from "react";
import { X } from "lucide-react";
import { useState } from "react";
import { UseGetDiet } from "../../hooks/useGetDiet";

const NewFood = ({ onClose, token }) => {
  const { CreateDietData } = UseGetDiet();
  // States
  const [NameFood, SetNameFood] = useState("");
  const [category, SetCategory] = useState("");
  const [Gramas, SetGramas] = useState(0.0);
  const [Kcal, SetKcal] = useState(0.0);
  const [Protein, SetProtein] = useState(0.0);
  const [Carbs, SetCarbs] = useState(0.0);
  const [Fat, SetFat] = useState(0.0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description: NameFood,
      category,
      portion_g: Gramas,
      energy_kcal: Kcal,
      protein_g: Protein,
      carbohydrate_g: Carbs,
      lipid_g: Fat,
    };

   await CreateDietData("/taco", data, token);
  };

  return (
    <div className="NewFood-content">
      <div className="NewFood-header">
        <h2 id="new-food-title">Criar Novo Alimento</h2>
        <button
          type="button"
          className="btn-exit NewFood-btn-exit"
          onClick={() => onClose?.()}
        >
          <X size={22} strokeWidth={2} />
        </button>
      </div>

      <form className="NewFood-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">
            Nome do Alimento <span className="required-mark">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ex: Frango desfiado"
            value={NameFood}
            onChange={(e) => SetNameFood(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="category">Categoria</label>
          <select name="Category" onChange={(e) => SetCategory(e.target.value)}>
            <option>Escolha abaixo</option>
            <option value="Carnes e derivados">Carnes e derivados</option>
            <option value="Verduras, hortaliças e derivados">
              Verduras, hortaliças e derivados
            </option>
            <option value="Frutas e derivados">Frutas e derivados</option>
            <option value="Cereais e derivados">Cereais e derivados</option>
            <option value="Pescados e frutos do mar">
              Pescados e frutos do mar
            </option>
            <option value="Alimentos preparados">Alimentos preparados</option>
            <option value="Leguminosas e derivados">
              Leguminosas e derivados
            </option>
            <option value="Leite e derivados">Leite e derivados</option>
            <option value="Produtos açucarados">Produtos açucarados</option>
            <option value="Gorduras e óleos">Gorduras e óleos</option>
            <option value="Bebidas (alcoólicas e não alcoólicas)">
              Bebidas (alcoólicas e não alcoólicas)
            </option>
            <option value="Nozes e sementes">Nozes e sementes</option>
            <option value="Miscelâneas">Miscelâneas</option>
            <option value="Ovos e derivados">Ovos e derivados</option>
            <option value="Outros alimentos industrializados">
              Outros alimentos industrializados
            </option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="Gramas">
            Gramas <span className="required-mark">*</span>
          </label>
          <input
            type="number"
            min={0.05}
            step="0.01"
            placeholder="Quantidade de gramas, Ex: 50.6"
            value={Gramas}
            onChange={(e) => SetGramas(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="kcal">
            Calorias (kcal) <span className="required-mark">*</span>
          </label>
          <input
            name="kcal"
            type="number"
            min={0.05}
            step="0.01"
            value={Kcal}
            onChange={(e) => SetKcal(e.target.value)}
            placeholder="Ex: 200"
            required
          />
        </div>

        <div className="optional-control">
          <div className="form-control">
            <label htmlFor="protein">Proteína (g)</label>
            <input
              name="protein"
              type="number"
              min={0.0}
              step="0.01"
              value={Protein}
              onChange={(e) => SetProtein(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="form-control">
            <label htmlFor="Carbs">Carboidrato (g)</label>
            <input
              name="carbs"
              type="number"
              min={0.0}
              step="0.01"
              value={Carbs}
              onChange={(e) => SetCarbs(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="form-control">
            <label htmlFor="fat">Gordura (g)</label>
            <input
              name="fat"
              type="number"
              min={0.0}
              step="0.01"
              value={Fat}
              onChange={(e) => SetFat(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <button type="submit" className="NewFood-submit">
          Salvar Alimento
        </button>
      </form>
    </div>
  );
};

export default NewFood;
