import '../css/Admin.css'
import HeaderMain from "../components/HeaderMain.jsx";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, UsersRound, UserRoundPlus, EllipsisVertical } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="admin">
      <HeaderMain />
      <div className="admin-container">
        <div className="header-admin">
          <div className="title-box">
            <div className="title">
              <Shield color="#3d8bff" />
              <h1>Painel de Administração</h1>
            </div>
            <p>Gerencie usuários, configurações e monitore o sistema</p>
          </div>
          <button className="home-back" onClick={() => navigate("/home")}>
            <ArrowLeft /> Voltar a home
          </button>
        </div>

        <div className="info-app-admin">
          <div className="info-adm">
            <div className="info-text">
              <p>Total de usuários:</p>
              <p className="total">1.234</p>
            </div>
          </div>

          <div className="info-adm">
            <div className="info-text">
              <p>Total de assinantes:</p>
              <p className="total">200</p>
            </div>
          </div>

          <div className="info-adm">
            <div className="info-text">
              <p>Usuários ativos:</p>
              <p className="total">700</p>
            </div>
          </div>

          <div className="info-adm">
            <div className="info-text">
              <p>Usuários inativos:</p>
              <p className="total">700</p>
            </div>
          </div>
        </div>
        <div className="manager-user">
          <div className="header-manager-user">
            <div className="title">
              <UsersRound />
              <h2>Gerenciador de usuários</h2>
            </div>
            <button>
              <UserRoundPlus /> Novo Usuário
            </button>
          </div>
          <form className="search-user">
            <input
              type="text"
              placeholder="Digite o nome ou email do usuário!"
            />
            <select name="plan">
              <option value="">Todos</option>
              <option value="Premium">Premium</option>
              <option value="free">free</option>
            </select>

            <select name="status">
              <option value="">Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </form>

          <div className="table-user">
            <div className="row">
              <div className="collumn">
                <p>Usuário</p>
              </div>

              <div className="collumn">
                <p>Plano</p>
              </div>
              <div className="collumn">
                <p>Status</p>
              </div>
              <div className="collumn">
                <p>Ações</p>
              </div>
            </div>

            <div className="row">
              <div className="collumn">
                <p>Usuário</p>
              </div>

              <div className="collumn">
                <p className="name">Carlos Henrique</p>
                <p>henriquevilas764@gmail.com</p>
              </div>
              <div className="collumn">
                <p className="plan">Free</p>
              </div>
              <div className="collumn">
               <button> <EllipsisVertical/> </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
