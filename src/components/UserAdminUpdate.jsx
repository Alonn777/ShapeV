import { useState } from "react";
import toast from "react-hot-toast";
import { useAdmin } from "../hooks/useAdmin";

const UserAdminUpdate = ({ id, token }) => {
  const { UpdateUserAdmin } = useAdmin();

  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordConfirmation, SetPasswordConfirmation] = useState("");
  const [SelectPlan, SetSelectPlan] = useState("");
  const [SelectStatus, SetSelectStatus] = useState("");
  const [SelectRole, SetSelectRole] = useState("");

  const SubmitForm = (e) => {
    e.preventDefault();

    if (password && password.length < 8) {
      toast.error("No minimo 8 caracteres!");
    }

    const user = {};
    if (name) user.name = name;
    if (password) user.password = password;
    if (passwordConfirmation) user.passwordConfirmation = passwordConfirmation;
    if (SelectPlan) user.plan = SelectPlan;
    if (SelectStatus) user.status = SelectStatus;
    if (SelectRole) user.role = SelectRole;

    UpdateUserAdmin(token, id, user);
  };
  return (
    <div className="user-interaction">
      <h2>Atualizar usuário</h2>
      <p>Preencha os dados em que você deseja atualizar </p>
      <form onSubmit={(e) => SubmitForm(e)}>
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
          <p>Atualizar senha:</p>
          <input
            type="password"
            placeholder="Para não atualizar a senha, deixe em branco!"
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

        <div className="form-option">
          <div className="select-control">
            <p>Plano:</p>
            <select
              className="select"
              onChange={(e) => SetSelectPlan(e.target.value)}
            >
              <option>Escolha abaixo!</option>
              <optgroup>
                <option value="premium">Premium</option>
                <option value="free">Grauito</option>
              </optgroup>
            </select>
          </div>
          <div className="select-control">
            <p>Status:</p>
            <select
              className="select"
              onChange={(e) => SetSelectStatus(e.target.value)}
            >
              <option>Escolha abaixo!</option>
              <optgroup>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="form-control">
          <p>Role:</p>
          <select
            className="select"
            onChange={(e) => SetSelectRole(e.target.value)}
          >
            <option>Defina o role abaixo!</option>
            <optgroup>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </optgroup>
          </select>
        </div>

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default UserAdminUpdate;
