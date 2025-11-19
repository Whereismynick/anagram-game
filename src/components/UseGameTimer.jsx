import { useState } from "react";

export const useGameTimer = (baseTime) => {
  const [timeLeft, setTimeLeft] = useState(baseTime);
  const [streak, setStreak] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const showNotification = (text, type = "info", duration = 1000) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => {
      const updated = [...prev, { id, text, type }];
      return updated.slice(-3);
    });

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  };

  const correctWord = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    setTimeLeft(prev => prev + 1);
    showNotification("+1 сек", "bonus");

    if (newStreak % 3 === 0) {
      setTimeLeft(prev => prev + 2);
      showNotification("+2 сек за стрик!", "bonus");
    }
  };

  const skipWord = (word) => {
    showNotification(word, "skip");
    setStreak(0);
    setTimeLeft(prev => Math.max(prev - 3, 0));
    showNotification("-3 сек (скип)", "penalty");
  };

  const wrongWord = () => {
    setStreak(0);
    showNotification("Неверно!", "penalty");
  };

  return {
    timeLeft,
    correctWord,
    skipWord,
    wrongWord,
    streak,
    setTimeLeft,
    notifications
  };
};
