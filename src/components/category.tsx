import { useState } from "react";
import { Card } from "./card";
import styles from "./style.module.css";

interface Props {
  categoryList: string[];
  backgroundColor: string;
  title: string;
  questions: string[];
}

export const Category = ({
  categoryList,
  backgroundColor,
  title,
  questions,
}: Props) => {
  const [disabledList, setDisabledList] = useState<boolean[]>(
    categoryList.map(() => false)
  );
  return (
    <div className={styles.category}>
      <div
        className={styles.category__title}
        style={{ backgroundColor: backgroundColor }}
      >
        {title}
      </div>
      <ul className={styles.category__list}>
        {categoryList.map((value, index) => (
          <Card
            disabled={disabledList[index]}
            setDisabled={(value) => {
              const newList = [...disabledList];
              newList[index] = value;
              setDisabledList(newList);
            }}
            key={value}
            category={title}
            title={value}
            backgroundColor={backgroundColor}
            question={questions[index]}
          />
        ))}
      </ul>
    </div>
  );
};
