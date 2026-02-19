import "../css/userLogin.css";
import { SessionStorage } from "../hooks/SessionStorage.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers.jsx";

const UserLogin = () => {
  const { postUser, postLogin } = useUsers();

  const navigate = useNavigate();
  const { storageUser } = SessionStorage();
  const [islogin, SetLogin] = useState(true);
  const [emailLogin, SetEmail] = useState("");
  const [passwordLogin, SetPassowrd] = useState("");
  const [nameCadaster, SetNameCadaster] = useState("");
  const [emailCadaster, SetEmailCadaster] = useState("");
  const [passowrdCadaster, SetPasswordCadaster] = useState("");
  const [passwordConfirmation, SetPassowrdConfirmation] = useState("");

  // CADASTRO DE USUÁRIO
  const buttonNewUser = (e) => {
    e.preventDefault();
    SetLogin(false);
  };
  const buttonCreate = (e) => {
    e.preventDefault();
    const user = {
      name: nameCadaster,
      email: emailCadaster,
      password: passowrdCadaster,
      passwordConfirmation: passwordConfirmation,
    };
    SetNameCadaster("");
    SetEmailCadaster("");
    SetPasswordCadaster("");
    SetPassowrdConfirmation("");
    SetLogin(true);
    createDataUser(user);
  };
  const createDataUser = async (user) => {
    const request = postUser("/users/register", user);
  };

  // BOTÃO PARA LOGAR
  const buttonLoginUser = (e) => {
    e.preventDefault();
    loginUser();
  };

  //  REQUISIÇÃO NO SERVIDOR
  const loginUser = async () => {
    try {
      const response = await postLogin("/users/login", {
        email: emailLogin,
        password: passwordLogin,
      });

      if (response) {
        navigate("/home");
        storageUser({ id: user[0].id, role: user[0].role });
      } else {
        console.log("Sua senha ou email está incorreta tente novamente");
      }
    } catch(error) {
      console.log("erro na requisição", error);
    }
  };

  return (
    <div className="box-login">
      {islogin ? (
        <form onSubmit={buttonLoginUser} className="login-user">
          <h2>Entre na sua conta agora !</h2>

          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Seu email..."
              value={emailLogin}
              onChange={(e) => SetEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Senha:</label>
            <input
              type="password"
              placeholder="Sua Senha.."
              value={passwordLogin}
              onChange={(e) => SetPassowrd(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-form">
            Entrar
          </button>
          <div className="box-create-account">
            <p>Não tem uma conta ?, cadastre-se agora!</p>
            <button onClick={buttonNewUser} className="button-account">
              Criar conta
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={buttonCreate} className="cadaster-user">
          <h2>Crie sua conta!</h2>
          <div className="form-control">
            <label htmlFor="Name">Nome:</label>
            <input
              type="text"
              placeholder="Seu nome é!"
              value={nameCadaster}
              onChange={(e) => SetNameCadaster(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Seu email..."
              value={emailCadaster}
              onChange={(e) => SetEmailCadaster(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              placeholder="Sua Senha.."
              value={passowrdCadaster}
              onChange={(e) => SetPasswordCadaster(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Confirmação de senha:</label>
            <input
              type="password"
              placeholder="Sua Senha.."
              value={passwordConfirmation}
              onChange={(e) => SetPassowrdConfirmation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-form">
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
};

export default UserLogin;
