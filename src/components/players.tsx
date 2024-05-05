import style from "./style.module.css";

export const Players = () => {
  return (
    <div className={style.players}>
      <div className={style.player}>
        <div className={style.player__name}>Player 1</div>
        <div className={style.player__score}>0</div>
      </div>
      <div className={style.player}>
        <div className={style.player__name}>Player 2</div>
        <div className={style.player__score}>0</div>
      </div>
    </div>
  );
};
