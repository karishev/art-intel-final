import { Card } from "./card";
import styles from "./style.module.css";

interface Props {
  categoryList: string[];
  backgroundColor: string;
  title: string;
}

export const Category = ({ categoryList, backgroundColor, title }: Props) => {
  return (
    <div className={styles.category}>
      <div
        className={styles.category__title}
        style={{ backgroundColor: backgroundColor }}
      >
        {title}
      </div>
      <ul className={styles.category__list}>
        {categoryList.map((value) => (
          <Card
            key={value}
            category={title}
            title={value}
            backgroundColor={backgroundColor}
          />
        ))}
      </ul>
    </div>
  );
};
