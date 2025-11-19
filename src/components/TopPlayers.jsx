import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TopPlayers.module.css";

const HistoryPopup = ({ player, onClose }) => {
  return createPortal(
    <div className={styles.historyPortal}>
      <h4>История последних игр</h4>
      {player.history?.length > 0 ? (
        <ul>
          {player.history.slice(0, 10).map((g, i) => (
            <li key={i}>
              🕹 {g.score} очков • ⏱ {g.time || "-"} • 📅 {g.date || "-"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет сохранённых игр</p>
      )}
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>,
    document.body
  );
};

const TopPlayers = () => {
  const [topList, setTopList] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/results/top")
      .then((res) => res.json())
      .then((data) => setTopList(data))
      .catch((err) => console.error("Ошибка загрузки топа:", err));
  }, []);

  const toggleHistory = (index) => {
    setSelectedPlayerIndex(selectedPlayerIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Топ игроков</h2>
      <ul className={styles.list}>
        {topList.map((player, index) => (
          <li
            key={player.username}
            className={`${styles.item} ${index === 0
                ? styles.gold
                : index === 1
                  ? styles.silver
                  : index === 2
                    ? styles.bronze
                    : ""
              }`}
            onClick={() => toggleHistory(index)}
          >
            <div className={styles.playerRow}>
              <span className={styles.rank}>{index + 1}.</span>
              <span className={styles.name}>{player.username}</span>
              <span className={styles.score}>{player.bestScore}</span>
            </div>

            {selectedPlayerIndex === index && (
              <HistoryPopup
                player={player}
                onClose={() => setSelectedPlayerIndex(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPlayers;
