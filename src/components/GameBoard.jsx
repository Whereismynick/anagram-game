import { useEffect, useState } from "react";
import styles from './GameBoard.module.css';

const GameBoard = ({ word }) => {
  const [displayWord, setDisplayWord] = useState(word);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => {
      setDisplayWord(word);
      setFade(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [word]);

  return (
    <div className={`${styles.word} ${fade ? styles.fade : ''}`}>
      {displayWord}
    </div>
  );
};

export default GameBoard;
