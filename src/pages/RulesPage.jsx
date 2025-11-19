import styles from "./RulesPage.module.css";

const RulesPage = () => {
  return (
    <div className={styles.rulesCard}>
      <h2 className={styles.rulesTitle}>Правила игры</h2>
     <ul className={styles.rulesList}>
  <li><span className={styles.icon}>🔤</span>Введи слово, которое появилось.</li>
  <li><span className={styles.icon}>⏱</span>Делай это до конца таймера.</li>
  <li><span className={styles.icon}>✅</span>За каждое верное слово получаешь <b>+1 очко</b> и <b>+1 секунду</b>.</li>
  <li><span className={styles.icon}>🔥</span>3 подряд верных ответа → бонус <b>+2 секунды</b>.</li>
  <li><span className={styles.icon}>❌</span>Ошибка сбрасывает серию.</li>
  <li><span className={styles.icon}>➡</span>Если пропустишь слово — <b>-3 секунды</b>.</li>
  <li><span className={styles.icon}>🏆</span>Цель: набрать максимум очков и попасть в топ!</li>
</ul>

    </div>
  );
};

export default RulesPage;