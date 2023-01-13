import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import useSensors from "../hooks/useSensors";

const MyBezierLineChart = ({ sensors, dataSources, ...Otherprops }) => {
  // console.log(props.data)
  const windowWidth = Dimensions.get("window").width;

  // log the other props

  return (
    <>
      <LineChart
        data={{
          labels: dataSources?.labels,
          datasets: dataSources?.datasets,
          legend: [
            sensors.one.legend,
            sensors.two.legend,
            sensors.three.legend,
          ],
        }}
        width={windowWidth - 24} // from react-native
        height={420}
        chartConfig={{
          backgroundColor: "#1088",
          backgroundGradientFrom: "#87ceeb",
          backgroundGradientTo: "#ffc0cb",
          decimalPlaces: 0,
          color: (opacity = 1) => "black",

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

function MultiGraph({ config, graphSittings, sensors, ...Otherprops }) {
  const { time, dataSources } = useSensors(
    sensors,
    config.timeStep,
    config.readsHistoryLimit
  );

  if (dataSources?.datasets[0]?.data.length === 0) {
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
          sensors={sensors}
          dataSources={dataSources}
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
export default MultiGraph;
const styles = StyleSheet.create({});
