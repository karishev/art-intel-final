import React from "react";
import styles from "./style.module.css";

interface Props {
  winner: string;
  score: number;
  onRestart: () => void;
}

export const WinningOverlay: React.FC<Props> = ({
  winner,
  score,
  onRestart,
}) => {
  return (
    <div className={styles.instructionsOverlay}>
      <div className={styles.instructionsOverlay__content}>
        <h1>{winner} won!</h1>
        <p>Final Score: {score}</p>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
};
