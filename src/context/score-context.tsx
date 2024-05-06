import React, { createContext, useContext, useState } from "react";

interface ScoreContextType {
  scores: number[];
  setScores: React.Dispatch<React.SetStateAction<number[]>>;
}

const PlayerScoreContext = createContext<ScoreContextType | undefined>(
  undefined
);

export const PlayerScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scores, setScores] = useState<number[]>([0, 0]); // Initial scores for two players

  return (
    <PlayerScoreContext.Provider value={{ scores, setScores }}>
      {children}
    </PlayerScoreContext.Provider>
  );
};

export const useScores = () => {
  const context = useContext(PlayerScoreContext);
  if (!context) {
    throw new Error("useScores must be used within a PlayerScoreProvider");
  }
  return context;
};
