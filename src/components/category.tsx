import { useEffect, useState } from "react";
import { Card } from "./card";
import styles from "./style.module.css";

interface Props {
  categoryList: string[];
  backgroundColor: string;
  title: string;
  questions: string[];
  onAllCardsDisabled: () => void;
}

export const Category = ({
  categoryList,
  backgroundColor,
  title,
  questions,
  onAllCardsDisabled,
}: Props) => {
  const [disabledList, setDisabledList] = useState<boolean[]>(
    categoryList.map(() => false)
  );

  useEffect(() => {
    if (disabledList.every((card) => card)) {
      onAllCardsDisabled();
    }
  }, [disabledList, onAllCardsDisabled]);
  
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
