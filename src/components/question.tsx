import styles from "./style.module.css";

interface Props {
  onClick: () => void;
}

export const Question = ({ onClick }: Props) => {
  return (
    <div className={styles.question}>
      <div className={styles.question__top}>
        <h2>Question</h2>
        <XIcon onClick={onClick} />
      </div>
    </div>
  );
};

export const XIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M8.99996 9.49996L5 5.5M5 5.5L1 1.5M5 5.5L9 1.5M5 5.5L1 9.5"
        stroke="#778C9F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
