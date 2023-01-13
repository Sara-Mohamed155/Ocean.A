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

const useSensors = (
  sensors,

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

  // Reads
  const [
    addElement_ONE,
    reads_ONE,
    setReads_ONE,
    resetRead_ONE,
    resetToInit_ONE,
  ] = useArrayLimiter(readsInit, readsHistoryLimit);
  const [
    addElement_TWO,
    reads_TWO,
    setReads_TWO,
    resetRead_TWO,
    resetToInit_TWO,
  ] = useArrayLimiter(readsInit, readsHistoryLimit);
  const [
    addElement_THREE,
    reads_THREE,
    setReads_THREE,
    resetRead_THREE,
    resetToInit_THREE,
  ] = useArrayLimiter(readsInit, readsHistoryLimit);

  const initDataSources = {
    labels: history,
    datasets: [
      {
        data: reads_ONE,
      },
      {
        data: reads_TWO,
      },
      {
        data: reads_THREE,
      },
    ],
  };

  const [dataSources, setDataSources] = useState(initDataSources);

  useInterval(
    () => {
      const recentReadsRef_ONE = query(
        ref(db, sensors.one.path),
        limitToLast(1)
      );
      const recentReadsRef_TWO = query(
        ref(db, sensors.two.path),
        limitToLast(1)
      );
      const recentReadsRef_THREE = query(
        ref(db, sensors.three.path),
        limitToLast(1)
      );

      // get read one
      get(recentReadsRef_ONE)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const lastValue = Object.values(snapshot.val())[0];

            const newData = addElement_ONE(lastValue);

            setDataSources((prev) => {
              // add new data to the datasets
              let newDatasets = prev.datasets;
              newDatasets[0] = {
                data: newData,
                color: () => sensors.one.color,
              };
              return {
                ...prev,
                datasets: newDatasets,
              };
            });
          } else {
            console.log("error reading data");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // get read two
      get(recentReadsRef_TWO)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const lastValue = Object.values(snapshot.val())[0];

            const newData = addElement_TWO(lastValue);

            setDataSources((prev) => {
              // add new data to the datasets
              let newDatasets = prev.datasets;
              newDatasets[1] = {
                data: newData,
                color: () => sensors.two.color,
              };

              return {
                ...prev,
                datasets: newDatasets,
              };
            });
          } else {
            console.log("error reading data");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // get read _THREE
      get(recentReadsRef_THREE)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const lastValue = Object.values(snapshot.val())[0];

            const newData = addElement_THREE(lastValue);

            setDataSources((prev) => {
              // add new data to the datasets
              let newDatasets = prev.datasets;
              newDatasets[2] = {
                data: newData,
                color: () => sensors.three.color,
              };
              return {
                ...prev,
                datasets: newDatasets,
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

    dataSources,
  };
};

export default useSensors;
