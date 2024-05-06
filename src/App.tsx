import styles from "./components/style.module.css";
import { Category } from "./components/category";
import { Players } from "./components/players";

import { PlayerScoreProvider } from "./context/score-context";

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
      questions: ["musk", "mark", "mrbeast", "tate", "jeorogan"],
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

  return (
    <PlayerScoreProvider>
      <>
        <section className={styles.section}>
          <h1 className={styles.title}>Jeopardy</h1>
          <div className={styles.game__container}>
            {categoryList.map((category) => (
              <Category
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
    </PlayerScoreProvider>
  );
}

export default App;
