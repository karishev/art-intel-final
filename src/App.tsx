import styles from "./components/style.module.css";
import { Category } from "./components/category";

function App() {
  const categoryList = [
    {
      title: "us politicians",
      backgroundColor: "rgb(114,200,122)",
      titles: ["100", "200", "300", "400", "500"],
    },
    {
      title: "singers",
      backgroundColor: "rgb(208,158,249)",
      titles: ["100", "200", "300", "400", "500"],
    },
    {
      title: "actors",
      backgroundColor: "rgb(241,159,109)",
      titles: ["100", "200", "300", "400", "500"],
    },
    {
      title: "Category 4",
      backgroundColor: "rgb(143,181,249)",
      titles: ["100", "200", "300", "400", "500"],
    },
    {
      title: "Category 5",
      backgroundColor: "rgb(219,171,96)",
      titles: ["100", "200", "300", "400", "500"],
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.game__container}>
        {categoryList.map((category) => (
          <Category
            key={category.title}
            title={category.title}
            categoryList={category.titles}
            backgroundColor={category.backgroundColor}
          />
        ))}
      </div>
      <div className={styles.section__right}></div>
    </section>
  );
}

export default App;
