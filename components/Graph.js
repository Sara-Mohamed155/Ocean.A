import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import useSensor from "../hooks/useSensor";

const MyBezierLineChart = ({ color, dataSource, legend, ...Otherprops }) => {
  // console.log(props.data)
  const windowWidth = Dimensions.get("window").width;

  // log the other props

  return (
    <>
      <LineChart
        data={{
          labels: dataSource?.labels,
          datasets: [
            {
              data: dataSource?.datasets[0]?.data,
            },
          ],
          legend: [legend],
        }}
        width={windowWidth - 24} // from react-native
        height={420}
        chartConfig={{
          backgroundColor: "#1088",
          backgroundGradientFrom: "#87ceeb",
          backgroundGradientTo: "#ffc0cb",
          decimalPlaces: 0,
          color: (opacity = 1) => color,

          style: {
            borderRadius: 16,
          },
          propsForDots: { r: 4 },
        }}
        style={{
          borderRadius: 16,
        }}
        {...Otherprops}
      />
    </>
  );
};

function Graph({ sensor, graphSittings, dataPath, ...Otherprops }) {
  const { time, dataSource } = useSensor(
    sensor.path,
    sensor.timeStep,
    sensor.readsHistoryLimit
  );

  if (dataSource?.datasets[0]?.data.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>No chart data to display!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <MyBezierLineChart
          color={sensor.color}
          dataSource={dataSource}
          legend={sensor.legend}
          bezier={graphSittings.bezier}
          withDots={graphSittings.withDots}
          withShadow={graphSittings.withShadow}
          segments={graphSittings.segments}
          fromZero={graphSittings.fromZero}
          {...Otherprops}
        />
      </View>
    </SafeAreaView>
  );
}
export default Graph;
const styles = StyleSheet.create({});
