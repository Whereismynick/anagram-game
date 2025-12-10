import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const endpoint = isRegister ? "register" : "login";
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      login({ username: data.username }, data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{isRegister ? "Регистрация" : "Войти"}</h2>
        <input
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя пользователя"
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button className={styles.button} onClick={handleSubmit}>
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setIsRegister(!isRegister);
            setUsername("");
            setPassword("");
            setError("");
          }}
        >
          {isRegister ? "Уже есть аккаунт?" : "Создать аккаунт"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
