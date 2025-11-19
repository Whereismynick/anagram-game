import styles from "./TimerBar.module.css";

const TimerBar = ({ timeLeft, maxTime }) => {
  const percent = maxTime ? (timeLeft / maxTime) * 100 : 0;

  let barColor = "#00cc00";
  if (percent <= 50 && percent > 20) {
    barColor = "#ffcc00";
  } else if (percent <= 20) {
    barColor = "#ff0000";
  }

  return (
    <div className={styles.timerBar}>
      <div
        className={styles.timerBarInner}
        style={{
          width: `${percent}%`,
          backgroundColor: barColor,
        }}
      ></div>
    </div>
  );
};

export default TimerBar;
