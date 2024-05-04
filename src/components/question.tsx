import { useEffect, useState } from "react";
import styles from "./style.module.css";

interface Props {
  onClick: () => void;
  category: string;
  question: string;
  difficulty: string;
  background: string;
}

export const Question = ({
  onClick,
  category,
  question,
  difficulty,
  background,
}: Props) => {
  const [currentRecording, setCurrentRecording] = useState(1);
  const [timer, setTimer] = useState(30);

  const [finished, setFinished] = useState(false);

  const recordings = [
    `/audios/${category}/${difficulty}/trump_true1.mp3`,
    `/audios/${category}/${difficulty}/trump_true2.mp3`,
    `/audios/${category}/${difficulty}/trump_true3.mp3`,
    `/audios/${category}/${difficulty}/trump_fake.mp3`,
  ];

  useEffect(() => {
    const playSequence = async () => {
      for (let i = 0; i < recordings.length; i++) {
        const audio = new Audio(recordings[i]);
        setCurrentRecording(i + 1);
        await new Promise((resolve) => {
          audio.onended = resolve;
          audio.play();
        });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Pause between recordings
      }
      setCurrentRecording(0);
    };

    playSequence();
    return () => {
      setCurrentRecording(0);
    };
  }, []);

  //   useEffect(() => {
  //     if (currentRecording > 0) {
  //       const countdown = setInterval(() => {
  //         setTimer((prev) => prev - 1);
  //       }, 1000);

  //       return () => clearInterval(countdown);
  //     }
  //   }, [currentRecording]);

  return (
    <div className={styles.question} style={{ background }}>
      <div className={styles.question__top}>
        <h2>Question</h2>
        <XIcon onClick={onClick} />
      </div>
      <div className={styles.question__content}>
        <div className={styles.question__content__top}>
          <div className={styles.question__content__top__text}>
            {currentRecording > 0 ? (
              <>
                {<h3>Recording {currentRecording} is playing</h3>}
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </>
            ) : (
              <h3>Select the fake recording</h3>
            )}
          </div>
        </div>
        <div className={styles.question__choices}>
          <ul className={styles.question__choices__list}>
            <li
              className={`${styles.question__choices__item} ${
                currentRecording === 1 ? styles.active : ""
              }`}
            >
              Recording 1
            </li>
            <li
              className={`${styles.question__choices__item} ${
                currentRecording === 2 ? styles.active : ""
              }`}
            >
              Recording 2
            </li>
            <li
              className={`${styles.question__choices__item} ${
                currentRecording === 3 ? styles.active : ""
              }`}
            >
              Recording 3
            </li>
            <li
              className={`${styles.question__choices__item} ${
                currentRecording === 4 ? styles.active : ""
              }`}
            >
              Recording 4
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const XIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M8.99996 9.49996L5 5.5M5 5.5L1 1.5M5 5.5L9 1.5M5 5.5L1 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};