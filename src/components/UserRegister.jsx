import { useState } from "react";
import {useUsers} from '../hooks/useUsers.jsx'

const UserRegister = () => {
  const {postUser} = useUsers();

  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordConfirmation, SetPasswordConfirmation] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      passwordConfirmation,
    };

    postUser("/users/register", user)
    SetName("");
    SetEmail("");
    SetPassword("");
    SetPasswordConfirmation("");
  };
  return (
    <div className="user-interaction">
      <h2>Criar novo usuário</h2>
      <p>Preencha os dados para adicionar um novo usuário ao sistema</p>
      <form onSubmit={(e) => submitForm(e)}>
        <div className="form-control">
          <p>Nome:</p>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={name}
            onChange={(e) => SetName(e.target.value)}
          />
        </div>

        <div className="form-control">
          <p>Email:</p>
          <input
            type="email"
            placeholder="Seu email: email@exemplo.com"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <p>Senha:</p>
          <input
            type="password"
            placeholder="Crie a sua senha aqui!"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
        </div>

        <div className="form-control">
          <p>Confirmação de senha:</p>
          <input
            type="password"
            placeholder="Confirme a sua senha digitada acima"
            value={passwordConfirmation}
            onChange={(e) => SetPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit">Criar usuário</button>
      </form>
    </div>
  );
};

export default UserRegister;
