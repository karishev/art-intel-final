import React, { useState } from "react";
import styles from "./style.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Question } from "./question";

interface Props {
  title: string;
  backgroundColor: string;
  category: string;
  question: string;
}

export const Card = ({ title, backgroundColor, category, question }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid black",
    borderRadius: "0.25rem",
    // boxShadow: 24,

    overflow: "auto",
  };

  return (
    <>
      <li
        className={styles.category__item}
        style={{ backgroundColor: backgroundColor }}
        onClick={handleOpen}
      >
        <p>{title}</p>
      </li>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Question
            background={backgroundColor}
            onClick={handleClose}
            category={category}
            question={question}
            difficulty={title}
          />
        </Box>
      </Modal>
    </>
  );
};
