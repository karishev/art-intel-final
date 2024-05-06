import React from "react";
import styles from "./style.module.css";

interface Props {
  onStart: () => void;
  showInstructions: boolean;
}

export const InstructionsOverlay: React.FC<Props> = ({
  onStart,
  showInstructions,
}) => {
  return (
    <div className={styles.instructionsOverlay}>
      <div className={styles.instructionsOverlay__content}>
        <h1>READ THE INSTRUCTIONS PLEASE</h1>
        <p className={styles.instructions}>
          This is a game for two players. Select a category and determine which
          of the four recordings is a fake one. It's a points-based system, so
          aim for correct answers. Each player can answer only once; your first
          selection is final. You will listen to the recordings only once, and
          after the last one is played, you have 10 seconds to answer.
        </p>
        <br />
        <p className={styles.instructions__warning}>
          YOU CAN'T RELISTEN THE RECORDINGS
        </p>
        <p className={styles.instructions__warning}>
          YOU CAN'T CHANGE YOUR ANSWER
        </p>
        <p className={styles.instructions_controls}>
          <strong>Controls:</strong> <br />{" "}
          <span style={{ color: "rgb(255, 204, 48)", fontWeight: 700 }}>
            Player 1 uses the 'A', 'S', 'D', 'F' keys.
          </span>
          <span style={{ color: "rgb(48, 204, 255)", fontWeight: 700 }}>
            Player 2 uses the 'H', 'J', 'K', 'L' keys.
          </span>{" "}
          <br />
          <span>
            Keys correspond to the recordings (e.g., 'A' for the first
            recording).
          </span>
        </p>
        <button onClick={onStart}>
          {" "}
          {showInstructions ? "Continue" : "Start Game"}
        </button>
      </div>
    </div>
  );
};
