import { useState } from "react";
import styles from "./WordInput.module.css";

const WordInput = ({ originalWord, onCorrect, onWrong, changeWord }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) return;

    if (trimmed.toLowerCase() === originalWord.toLowerCase()) {
      setStatus('correct');
      onCorrect();
      setTimeout(() => {
        setInput('');
        setStatus('');

      }, 300);
    } else {
      setStatus('wrong');
      onWrong();
      setTimeout(() => setStatus(''), 500);
    }

    setInput('');
  };



  return (
    <form onSubmit={handleSubmit} className={styles.wordForm}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите слово..."
        autoFocus
        className={`${styles.wordInput} ${status === 'correct' ? styles.correct : ''} ${status === 'wrong' ? styles.wrong : ''}`}
      />
      <button className={styles.submitButton} type="submit">Ввод</button>
    </form>
  );
};

export default WordInput;