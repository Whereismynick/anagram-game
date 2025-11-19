import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import GamePage from "./pages/GamePage";
import RulesPage from "./pages/RulesPage";
import TopPlayersPage from "./pages/TopPlayersPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  const { user } = useContext(AuthContext);
  const [activePage, setActivePage] = useState("game");

  if (!user) return <LoginForm />;

  return (
    <div className={styles.app}>
      <Header setActivePage={setActivePage} />

      <main className={styles.main}>
        <div className={styles.gameCard}>
          {activePage === "game" && <GamePage player={user.username} />}
          {activePage === "rules" && <RulesPage />}
          {activePage === "top" && <TopPlayersPage />}
          {activePage === "about" && <AboutPage />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
