// tak an array with a max length and return a new array with the first element removed if the array is longer than the max length

import { useState } from "react";

const useArrayLimiter = (initArray, limit) => {
  const [newArray, setNewArray] = useState(initArray);

  const updateArray = (newArray) => {
    if (newArray.length >= limit) {
      // keep the last limit elements
      return [...newArray.slice(newArray.length - limit)];
    } else {
      return [...newArray];
    }
  };

  const resetArray = () => {
    setNewArray([]);
  };

  const resetToInit = () => {
    setNewArray(initArray);
  };

  const addElement = (element) => {
    const fullArray = [...newArray, element];
    let updatedArray = [];
    // check if limit is reached
    if (fullArray.length >= limit) {
      // keep the last limit elements
      updatedArray = [...fullArray.slice(fullArray.length - limit)];
    } else {
      updatedArray = [...fullArray];
    }

    setNewArray(updatedArray);
    return updatedArray;
  };

  return [addElement, newArray, setNewArray, resetArray, resetToInit];
};

export default useArrayLimiter;
