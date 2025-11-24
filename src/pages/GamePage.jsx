import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import WordInput from "../components/WordInput";
import TimerBar from "../components/TimerBar";
import { useGameTimer } from "../components/UseGameTimer";
import styles from "./GamePage.module.css";

const GamePage = () => {
  const { user, token } = useContext(AuthContext);

  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem(`bestScore_${user?.username}`)) || 0
  );
  const [finalMessage, setFinalMessage] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);

  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);

  const { timeLeft, correctWord, skipWord, wrongWord, setTimeLeft, notifications } = useGameTimer(60);

  const shuffle = (word) => word.split("").sort(() => Math.random() - 0.5).join("");

  useEffect(() => {
    fetch("/wordlist.json")
      .then(res => res.json())
      .then(data => {
        const uniqueWords = [...new Set(data)];
        setWords(uniqueWords);
        const word = uniqueWords[Math.floor(Math.random() * uniqueWords.length)];
        setCurrentWord(word);
        setShuffledWord(shuffle(word));
      });
  }, []);

  const changeWord = () => {
    if (!words.length) return;
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setShuffledWord(shuffle(word));
  };

  const handleCorrect = () => {
    correctWord();
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem(`bestScore_${user?.username}`, newScore);
      }
      return newScore;
    });
    changeWord();
  };

  const handleSkip = () => {
    skipWord(currentWord);
    changeWord();
  };

  const handleWrong = () => { wrongWord(); };

  useEffect(() => {
    if (!isGameActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameActive(false);
          setFinalMessage(`Время вышло! Вы ввели: ${scoreRef.current} слов`);
          saveResultToServer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameActive]);

  const saveResultToServer = async () => {
  if (!token) return;
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    await fetch(`${API_URL}/api/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ score: scoreRef.current })
    });
  } catch (err) {
    console.error("Ошибка при сохранении результата:", err);
  }
};

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    changeWord();
    setFinalMessage("");
    setIsGameActive(true);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.timeSection}>
          <span className={styles.timeText}>Время: {timeLeft}</span>
          <div className={styles.timerBar}><TimerBar timeLeft={timeLeft} maxTime={60} /></div>
        </div>
        <div className={styles.scoreSection}>Счёт: {score}</div>
      </div>

      {!isGameActive && bestScore > 0 && (
        <div className={styles.bestScoreGame}>Лучший результат: {bestScore}</div>
      )}

      <div className={styles.notifications}>
        {notifications.map(n => (
          <div key={n.id} className={`${styles.notification} ${styles[n.type]}`}>
            {n.text}
          </div>
        ))}
      </div>

      {finalMessage && <h2 className={styles.finalMessage}>{finalMessage}</h2>}

      {isGameActive && (
        <div className={styles.gameArea}>
          <h2 className={styles.gameWord}>{shuffledWord}</h2>
          <div className={styles.gameControls}>
            <button className={styles.skipButton} onClick={handleSkip}>Пропустить</button>
            <WordInput
              originalWord={currentWord}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              onSkip={handleSkip}
              changeWord={changeWord}
            />
          </div>
        </div>
      )}

      {!isGameActive && (
        <button className={styles.startButton} onClick={startGame}>
          {finalMessage ? "Новый раунд" : "Начать игру"}
        </button>
      )}
    </div>
  );
};

export default GamePage;
