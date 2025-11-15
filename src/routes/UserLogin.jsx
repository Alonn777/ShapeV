import {  useState } from "react";
import {SessionStorage} from "../hooks/SessionStorage.jsx"
import { useNavigate } from "react-router-dom";
import "../css/userLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const {storageUser} = SessionStorage()

  const [islogin, SetLogin] = useState(true);
  const [email, SetEmail] = useState("");
  const [password, SetPassowrd] = useState("");
  const [nameCadaster, SetNameCadaster] = useState("");
  const [emailCadaster, SetEmailCadaster] = useState("");
  const [passowrdCadaster, SetPasswordCadaster] = useState("");

 
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
    };
    SetNameCadaster("");
    SetEmailCadaster("");
    SetPasswordCadaster("");

    createDataUser(user);
    SetLogin(true);
  };
  const createDataUser = async (user) => {
    const PostData = await fetch("http://localhost:3000/app/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  // BOTÃO PARA LOGAR
  const buttonLoginUser = (e) => {
    e.preventDefault();
    requestUsers();
  };

//  REQUISIÇÃO NO SERVIDOR 
  const requestUsers = async () => {
    try {
      const usersData = await fetch("http://localhost:3000/app/users");
      const result = await usersData.json();
      authenticationUser(result.users)
    } catch  {
      console.log("erro na requisição");
    }
  };

  const authenticationUser = async (users) => {
    const usersData = await users;
    const userFind = usersData.find(
      (user) => user.email === email && user.password === password
    );
    
    if (userFind) {
      console.log("Logado com sucesso");
      storageUser(userFind.id)
      navigate("/home")
      
    } else {
      console.log("usuário com senha ou email errado");
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
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Senha:</label>
            <input
              type="password"
              placeholder="Sua Senha.."
              value={password}
              onChange={(e) => SetPassowrd(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-form">
            Entrar
          </button>
          <div id="box-create-account">
            <p>Não tem uma conta ?, cadastre-se agora!</p>
            <button onClick={buttonNewUser} id="button-account">
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
            <label htmlFor="email">Senha:</label>
            <input
              type="password"
              placeholder="Sua Senha.."
              value={passowrdCadaster}
              onChange={(e) => SetPasswordCadaster(e.target.value)}
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
