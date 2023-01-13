import { useMemo, useState } from "react";

// hook to time management to be used in dynamic graphs
export default function useTime(init = 0, historyLimit) {
  const [time, setTime] = useState(init);
  const [history, setHistory] = useState([init]);

  const incrementTime = (step) => {
    const newTime = time + step;

    // add the new time to the history
    setHistory((prev) => {
      const newHistory = [...prev, newTime];

      if (newHistory.length > historyLimit) {
        return [...newHistory.slice(newHistory.length - historyLimit)];
      }
      return [...newHistory];
    });

    setTime(newTime);
  };

  const resetTimer = () => {
    setTime(0);
    setHistory([init]);
  };

  // format the time to be displayed
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }, [time]);
  const formatedDigits = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }, [time]);

  // console.log("🚀 ~ history", history);

  return {
    formattedTime,
    formatedDigits,
    incrementTime,
    // return the time in seconds
    time,
    history,
    resetTimer,
  };
}
