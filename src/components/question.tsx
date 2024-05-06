import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { Players } from "./players";
import { useScores } from "../context/score-context";

interface Props {
  onClick: () => void;
  category: string;
  question: string;
  difficulty: string;
  background: string;
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export const Question = ({
  onClick,
  category,
  question,
  difficulty,
  background,
}: Props) => {
  const [currentRecording, setCurrentRecording] = useState(1);
  const [timer, setTimer] = useState(10);
  const [timerWidth, setTimerWidth] = useState(100); // Width in percentage
  const [sequenceFinished, setSequenceFinished] = useState(false);
  const [calculate, setCalculate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [isBlinking, setIsBlinking] = useState(false);

  const recordings = [
    `/audios/${category}/${difficulty}/${question}_true1.mp3`,
    `/audios/${category}/${difficulty}/${question}_true2.mp3`,
    `/audios/${category}/${difficulty}/${question}_true3.mp3`,
    `/audios/${category}/${difficulty}/${question}_fake.mp3`,
  ];

  const [shuffledRecordings, setShuffledRecordings] = useState<string[]>(
    shuffleArray([...recordings])
  );

  const { scores, setScores } = useScores();
  const [playerAnswers, setPlayerAnswers] = useState([-1, -1]); // Last key pressed by each player
  const playerAnswersRef = useRef(playerAnswers);
  playerAnswersRef.current = playerAnswers;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const keyMap = { a: 0, s: 1, d: 2, f: 3, h: 0, j: 1, k: 2, l: 3 };
      if (event.key in keyMap) {
        const playerIndex = ["a", "s", "d", "f"].includes(event.key) ? 0 : 1;

        if (playerAnswersRef.current[playerIndex] !== -1) {
          return;
        }
        setPlayerAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[playerIndex] = keyMap[event.key as keyof typeof keyMap];
          return newAnswers;
        });
      }
    },
    // Include playerAnswers and correctAnswer in the dependency array
    [playerAnswers, correctAnswer]
  );

  useEffect(() => {
    console.log("HERE5:", playerAnswers, correctAnswer);
  }, [playerAnswers, correctAnswer]);

  useEffect(() => {
    const playSequence = async () => {
      // Shuffle the recordings array

      setCorrectAnswer(
        shuffledRecordings.findIndex((recording) =>
          recording.endsWith("_fake.mp3")
        )
      );

      for (let i = 3; i < shuffledRecordings.length; i++) {
        const audio = new Audio(shuffledRecordings[i]);
        setCurrentRecording(i + 1);
        await new Promise((resolve) => {
          audio.onended = resolve;
          audio.play();
        });
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Pause between recordings
      }
      setCurrentRecording(0);
      setSequenceFinished(true);
      window.addEventListener("keydown", handleKeyPress);
    };

    playSequence();
    return () => {
      setCurrentRecording(0);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    const checkAnswersComplete = () => {
      // Check if both players have answered
      return playerAnswers.every((answer) => answer !== -1);
    };

    if (sequenceFinished) {
      interval = setInterval(() => {
        if (checkAnswersComplete()) {
          clearInterval(interval);
          handleCorrect();
          setCalculate(true);
          setTimerWidth(0);
          setTimer(0);
          return;
        }

        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            const newWidth = ((prevTimer - 1) / 10) * 100;
            setTimerWidth(newWidth);
            return prevTimer - 1;
          }
          clearInterval(interval);
          handleCorrect();
          setCalculate(true);

          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sequenceFinished, playerAnswers]);

  useEffect(() => {
    if (sequenceFinished && !finished && calculate) {
      setCalculate(false);
      // Calculate score changes only after the sequence is finished
      const scoreChanges = playerAnswers.map((answer, index) => {
        if (answer === correctAnswer) {
          return parseInt(difficulty); // Add points based on difficulty
        } else if (answer !== -1) {
          return -parseInt(difficulty); // Subtract points if wrong
        }
        return 0;
      });

      // Update scores asynchronously after all calculations are done
      setTimeout(() => {
        setScores((prevScores) =>
          prevScores.map((score, index) => score + scoreChanges[index])
        );
      }, 0);
    }
  }, [
    sequenceFinished,
    finished,
    playerAnswers,
    correctAnswer,
    difficulty,
    setScores,
    calculate,
    setCalculate,
  ]);

  const handleCorrect = () => {
    setIsBlinking(true);

    setTimeout(() => {
      setIsBlinking(false);
      setFinished(true);
    }, 2000); // Blink for 2 seconds
  };

  return (
    <>
      <div className={styles.question} style={{ background }}>
        <div className={styles.question__top}>
          <h2>
            Question for {difficulty}: which is a fake recording of {question}{" "}
            generated by AI?
          </h2>
          {finished && <XIcon onClick={onClick} />}
        </div>
        <div className={styles.question__content}>
          <div className={styles.question__content__top}>
            <div>
              <img
                src={`/audios/${category}/${difficulty}/${question}.png`}
                alt="trump"
              />
            </div>
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
                <div className={styles.question__content__top__text__bottom}>
                  <h3>Select the fake recording</h3>
                  {playerAnswers[0] !== -1 && <p>Player 1 answered!</p>}
                  {playerAnswers[1] !== -1 && <p>Player 2 answered!</p>}
                </div>
              )}
            </div>
          </div>
          <div className={styles.question__choices}>
            <ul className={styles.question__choices__list}>
              {[1, 2, 3, 4].map((recordingNumber) => (
                <li
                  key={recordingNumber}
                  className={`${styles.question__choices__item} ${
                    currentRecording === recordingNumber ? styles.active : ""
                  }${
                    isBlinking && recordingNumber - 1 === correctAnswer
                      ? styles.blink
                      : ""
                  }`}
                >
                  {finished && playerAnswers[0] === recordingNumber - 1 && (
                    <div className={styles.player1}>↑</div>
                  )}
                  {finished && playerAnswers[1] === recordingNumber - 1 && (
                    <div className={styles.player2}>↑</div>
                  )}
                  Recording {recordingNumber}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={styles.timerBar}
            style={{ width: `${timerWidth}%` }}
          ></div>
          <div className={styles.timerBar__text}>
            <p>{timer}</p>
          </div>
        </div>
      </div>
    </>
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
