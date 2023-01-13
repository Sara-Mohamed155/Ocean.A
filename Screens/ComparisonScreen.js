import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import Graph from "../components/Graph";
import MultiGraph from "../components/MultiGraph";
import { routes } from "../constants/names";

const Divider = () => {
  return (
    <View
      style={{
        // divder
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "100%",
        marginVertical: 10,
      }}
    />
  );
};

const Controller = ({ value, setValue, title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 1,
        // justifyContent: "space-between",
        alignItems: "center",
        width: "40%",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          padding: 10,
        }}
      >
        {title}
      </Text>
      <Switch value={value} onValueChange={setValue} />
    </View>
  );
};

function ComaprisonScreen({ route: { params } }) {
  let tableData = [];

  const mode = params.mode; // mixed, co2, waterlvl, pH

  const [showController, setShowController] = useState({
    // main controller
    panal: false,

    // single graph

    single: mode !== routes.MIXED,
    graph: false,

    // grahps
    mix: mode === routes.MIXED,
    co2: mode === routes.CO2,
    waterlvl: mode === routes.WATERLVL,
    pH: mode === routes.PH,
  });

  const [graphSittings, setGraphSittings] = useState({
    bezier: true,
    withDots: true,
    withShadow: true,
    segments: 10,
    fromZero: true,
  });

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Graphs Control</Text>
        <Switch
          value={showController.panal}
          onValueChange={() => {
            setShowController({
              ...showController,
              panal: !showController.panal,
            });
          }}
        />
      </View>
      {showController.panal && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            value={graphSittings.bezier}
            setValue={(value) =>
              setGraphSittings({ ...graphSittings, bezier: value })
            }
            title="Bezier"
          />
          <Controller
            value={graphSittings.withDots}
            setValue={(value) =>
              setGraphSittings({ ...graphSittings, withDots: value })
            }
            title="With Dots"
          />
          <Controller
            value={graphSittings.withShadow}
            setValue={(value) =>
              setGraphSittings({ ...graphSittings, withShadow: value })
            }
            title="With Shadow"
          />
          <Controller
            value={graphSittings.fromZero}
            setValue={(value) =>
              setGraphSittings({ ...graphSittings, fromZero: value })
            }
            title="From Zero"
          />
        </View>
      )}

      {!showController.single && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Graphs To Show</Text>
            <Switch
              value={showController.graph}
              onValueChange={() => {
                setShowController({
                  ...showController,
                  graph: !showController.graph,
                });
              }}
            />
          </View>
          {showController.graph && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Controller
                value={showController.mix}
                setValue={(value) =>
                  setShowController({ ...showController, mix: value })
                }
                title="Mixed"
              />
              <Controller
                value={showController.waterlvl}
                setValue={(value) =>
                  setShowController({ ...showController, waterlvl: value })
                }
                title="Water Level"
              />
              <Controller
                value={showController.co2}
                setValue={(value) =>
                  setShowController({ ...showController, co2: value })
                }
                title="CO2"
              />
              <Controller
                value={showController.pH}
                setValue={(value) =>
                  setShowController({ ...showController, pH: value })
                }
                title="pH"
              />
            </View>
          )}
        </>
      )}

      <View style={styles.container}>
        {showController.mix && (
          <>
            <MultiGraph
              config={{
                timeStep: 5,
                readsHistoryLimit: 10,
              }}
              sensors={{
                one: {
                  path: "/Sensor/waterlvl",
                  legend: "Water level",
                  color: "blue",
                },
                two: {
                  path: "/Sensor2/CO2",
                  legend: "CO2",
                  color: "black",
                },
                three: {
                  path: "/Sensor3/pH",
                  legend: "pH",
                  color: "red",
                },
              }}
              graphSittings={graphSittings}
            />
            <Divider />
          </>
        )}

        {showController.waterlvl && (
          <>
            <Graph
              sensor={{
                path: "/Sensor/waterlvl",
                legend: "Water level",
                timeStep: 5,
                readsHistoryLimit: 10,
                color: "blue",
              }}
              graphSittings={graphSittings}
            />
            <Divider />
          </>
        )}

        {showController.co2 && (
          <>
            <Graph
              sensor={{
                path: "/Sensor2/CO2",
                legend: "CO2",
                timeStep: 5,
                readsHistoryLimit: 10,
                color: "black",
              }}
              graphSittings={graphSittings}
            />
            <Divider />
          </>
        )}

        {showController.pH && (
          <>
            <Graph
              sensor={{
                path: "/Sensor3/pH",
                legend: "pH",
                timeStep: 5,
                readsHistoryLimit: 10,
                color: "red",
              }}
              graphSittings={graphSittings}
            />
            <Divider />
          </>
        )}
      </View>
      {/* <Text style={styles.text}>Time: {time.formattedTime}</Text> */}
    </ScrollView>
  );
}

export default ComaprisonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
    paddingTop: 24,
  },
  secContainer: {
    paddingTop: 30,
  },
  text: { margin: 21, fontSize: 18, color: "purple", textAlign: "center" },

  control: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});
