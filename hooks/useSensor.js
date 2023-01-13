// input, realtime database address: /Sensor2/CO2

import { get, limitToLast, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import useArrayLimiter from "./useArrayLimiter";
import useInterval from "./useInterval";
import useIsMounted from "./useIsMounted";
import useTime from "./useTime";

// out put
// label time
// data co2 values
/*
data = {
  {
          labels,
          datasets: [
            {
              data,
            },
          ],
      }}
*/

const useSensor = (
  sensorPath,
  timeStep = 3,
  readsHistoryLimit = 5,
  timeInit = 0,
  readsInit = []
) => {
  // const isMounted = useIsMounted();
  const [isPlaying, setPlaying] = useState(false);
  const isMounted = useIsMounted();

  const {
    formattedTime,
    formatedDigits,
    incrementTime,
    // return the time in seconds
    time,
    history,
    resetTimer,
  } = useTime(timeInit, readsHistoryLimit);
  // console.log("🚀 ~ history", sensorPath, history);

  const [addElement, reads, setReads, resetRead, resetToInit] = useArrayLimiter(
    readsInit,
    readsHistoryLimit
  );

  const initDataSource = {
    labels: history,
    datasets: [
      {
        data: reads,
      },
    ],
  };

  const [dataSource, setDataSource] = useState(initDataSource);

  useInterval(
    () => {
      const recentReadsRef = query(ref(db, sensorPath), limitToLast(1));

      get(recentReadsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const lastValue = Object.values(snapshot.val())[0];

            const newData = addElement(lastValue);

            setDataSource((prev) => {
              return {
                labels: history,
                datasets: [
                  {
                    data: newData,
                  },
                ],
              };
            });
          } else {
            console.log("error reading data");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      incrementTime(timeStep);
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? timeStep * 1000 : null
  );

  const stopTimer = () => {
    setPlaying(false);
  };
  useEffect(() => {
    if (!isMounted()) return;
    setPlaying(true);
    console.log("🚀 ~ useEffect ~ isPlaying", isPlaying);
    return () => {
      stopTimer();
      console.log("🚀 ~ useEffect ~ cleared", isPlaying);
    };
  }, []);

  return {
    time: {
      value: time,
      formattedTime,
      history,
      resetTimer,
      stopTimer,
    },
    reads: {
      data: reads,
      resetRead,
      resetToInit,
    },
    reset: () => {
      stopTimer();
      resetTimer();
      resetRead();
      setDataSource(initDataSource);
    },
    dataSource,
  };
};

export default useSensor;
