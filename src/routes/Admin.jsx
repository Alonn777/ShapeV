import "../css/Admin.css";
import Loader from "../components/Loader.jsx";
import HeaderMain from "../components/HeaderMain.jsx";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  ArrowLeft,
  UsersRound,
  UserRoundPlus,
  EllipsisVertical,
} from "lucide-react";
import { useAdmin } from "../hooks/useAdmin.jsx";
import { SessionStorage } from "../hooks/SessionStorage.jsx";
import UserRegister from "../components/UserRegister.jsx";
import UserAdminUpdate from "../components/UserAdminUpdate.jsx";

const Admin = () => {
  const { data, getStorageUser } = SessionStorage();
  const token = data?.token;
  const { CountInfos, UsersInfo } = useAdmin(token);
  useEffect(() => {
    getStorageUser();
  }, {});
  useEffect(() => {
    SetDataUsersInfo(UsersInfo);
  }, [UsersInfo]);
  const navigate = useNavigate();

  const [DataUsersInfo, SetDataUsersInfo] = useState([]);
  const [RegisterUser, SetRegisterUser] = useState(false);
  const [UpdateUser, SetUpdateUser] = useState(false);
  const [SelectId, SetSelectId] = useState("")

  const HandleRenderStatus = (id, status) => {
    if (status === false) {
      SetDataUsersInfo((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              render_status: true,
            };
          }
          return user;
        }),
      );

      SetSelectId(id)
    }
    if (status === true) {
      SetDataUsersInfo((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              render_status: false,
            };
          }
          return user;
        }),
      );
      SetSelectId("")
    }
  };

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
              <p className="total">
                {CountInfos ? CountInfos.all : <Loader />}
              </p>
            </div>
          </div>

          <div className="info-adm">
            <div className="info-text">
              <p>Total de assinantes:</p>
              <p className="total">
                {CountInfos ? CountInfos.premium : <Loader />}
              </p>
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

        {RegisterUser ? (
          <div className="admin-interaction">
            <UserRegister />
            <div
              className="shadow-interaction"
              onClick={() => SetRegisterUser(false)}
            ></div>
          </div>
        ) : (
          ""
        )}

        {UpdateUser ? (
          <div className="admin-interaction">
            <UserAdminUpdate id={SelectId} token={token} />
            <div
              className="shadow-interaction"
              onClick={() => SetUpdateUser(false)}
            ></div>
          </div>
        ) : (
          ""
        )}
        <div className="manager-user">
          <div className="header-manager-user">
            <div className="title">
              <UsersRound />
              <h2>Gerenciador de usuários</h2>
            </div>
            <button onClick={() => SetRegisterUser(true)}>
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
                <p>Role</p>
              </div>

              <div className="collumn">
                <p>Usuário</p>
              </div>
              <div className="collumn">
                <p>Plano</p>
              </div>
              <div className="collumn">
                <p>Ações</p>
              </div>
            </div>

            {DataUsersInfo.length > 1 ? (
              DataUsersInfo.map((item) => (
                <div className="row" key={item.id}>
                  <div className="collumn">
                    <p>{item.role}</p>
                  </div>

                  <div className="collumn">
                    <p className="name">{item.name}</p>
                    <p>{item.email}</p>
                  </div>
                  <div className="collumn">
                    <p className="plan">{item.plan}</p>
                  </div>
                  <div className="collumn">
                    <button onClick={() => HandleRenderStatus(item.id, item.render_status)}>
                      <EllipsisVertical />
                    </button>
                  </div>
                  {item.render_status ? (
                    <div className="container-updates">
                      <button>Detalhes</button>
                      <button onClick={() => SetUpdateUser(true)}>
                        Editar
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
