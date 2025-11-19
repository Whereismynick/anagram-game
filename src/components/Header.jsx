import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Header.module.css";

const Header = ({ setActivePage }) => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = ["game", "rules", "top", "about"];
  const pageNames = {
    game: "Играть",
    rules: "Правила",
    top: "Топ-игроков",
    about: "О проекте"
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        {pages.map((page) => (
          <li
            key={page}
            className={styles.navItem}
            onClick={() => handlePageClick(page)}
          >
            {pageNames[page]}
          </li>
        ))}
      </ul>

      <div className={styles.user}>
        <span className={styles.hello}>Привет, {user.username}</span>
        <button className={styles.logoutButton} onClick={logout}>
          Выйти
        </button>
      </div>

      <div
        className={styles.burger}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <ul>
          {pages.map((page) => (
            <li
              key={page}
              className={styles.mobileItem}
              onClick={() => handlePageClick(page)}
            >
              {pageNames[page]}
            </li>
          ))}
        </ul>
        <div className={styles.mobileUser}>
          <span>Привет, {user.username}</span>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
