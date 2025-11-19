import { useEffect, useState } from "react";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = ({ score, bestScore, player, showBest }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className={styles.scoreBoard}>
      <div className={`${styles.score} ${animate ? styles.animate : ""}`}>
        Текущий счёт: {score}
      </div>
      {showBest && (
        <div className={styles.bestScore}>
          Лучший результат ({player}): {bestScore}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
