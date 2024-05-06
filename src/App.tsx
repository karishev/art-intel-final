import styles from "./components/style.module.css";
import { Category } from "./components/category";
import { Players } from "./components/players";

import { useScores } from "./context/score-context";
import { useEffect, useState } from "react";
import { InstructionsOverlay } from "./components/instructions";
import { WinningOverlay } from "./components/winning";

function App() {
  const categoryList = [
    {
      title: "us politicians",
      backgroundColor: "rgb(114,200,122)",
      titles: ["100", "200", "300", "400", "500"],
      questions: ["arnold", "trump", "biden", "obama", "clinton"],
    },
    {
      title: "singers",
      backgroundColor: "rgb(208,158,249)",
      titles: ["100", "200", "300", "400", "500"],
      questions: ["taylor", "rihanna", "snoop", "justin", "michael"],
    },
    {
      title: "celebrity",
      backgroundColor: "rgb(241,159,109)",
      titles: ["100", "200", "300", "400", "500"],
      questions: ["musk", "mark", "mrbeast", "tate", "joerogan"],
    },
    {
      title: "cartoon",
      backgroundColor: "rgb(143,181,249)",
      titles: ["100", "200", "300", "400", "500"],
      questions: ["spongebob", "homer", "donald", "grinch", "goku"],
    },
    {
      title: "actors",
      backgroundColor: "rgb(219,171,96)",
      titles: ["100", "200", "300", "400", "500"],
      questions: ["keanu", "johnny", "arnold", "morgan", "smith"],
    },
  ];

  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const [gameFinished, setGameFinished] = useState(false);
  const { scores } = useScores();

  const [allCardsDisabled, setAllCardsDisabled] = useState<boolean[]>(
    categoryList.map(() => false)
  );

  const checkWinCondition = () => {
    // Logic to determine if all cards are disabled
    if (allCardsDisabled.every((card) => card)) {
      setGameFinished(true);
    }
  };

  useEffect(() => {
    checkWinCondition();
  }, [allCardsDisabled]);

  const getWinner = () => {
    const maxScore = Math.max(...scores);
    const winnerIndex = scores.indexOf(maxScore);
    return `Player ${winnerIndex + 1}`;
  };

  return (
    <>
      {(!gameStarted || showInstructions) && (
        <InstructionsOverlay
          onStart={startGame}
          showInstructions={showInstructions}
        />
      )}

      <div className={styles.instructions__toggle}>
        <button onClick={() => setShowInstructions(!showInstructions)}>
          Instructions ?
        </button>
      </div>

      <>
        <section className={styles.section}>
          <h1 className={styles.title}>Jeopardy! Can You Spot the Fake?</h1>
          <div className={styles.game__container}>
            {categoryList.map((category, index) => (
              <Category
                onAllCardsDisabled={() =>
                  setAllCardsDisabled((prev) => {
                    const newDisabled = [...prev];
                    newDisabled[index] = true;
                    return newDisabled;
                  })
                }
                key={category.title}
                title={category.title}
                categoryList={category.titles}
                questions={category.questions}
                backgroundColor={category.backgroundColor}
              />
            ))}
          </div>
        </section>
        <Players />
      </>
      {gameFinished && (
        <WinningOverlay
          winner={getWinner()}
          score={Math.max(...scores)}
          onRestart={() => window.location.reload()}
        />
      )}
    </>
  );
}

export default App;
