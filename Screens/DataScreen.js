import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BG from "../assets/BG.jpg";
import Icon from "../components/icon";
import { routes } from "../constants/names";
const image = { uri: "https://reactjs.org/logo-og.png" };

function DataScreen({ navigation }) {
  const [co2, setCo2] = useState([]);
  const [pH, setPH] = useState([]);
  const [waterLvl, setWaterLvl] = useState([]);

  // useEffect(() => {
  //     onValue(ref(db, '/'), querySnapShot => {
  //         let data = querySnapShot.val() || {};

  //         const co2Values = Object.values(data.Sensor2.Gas);
  //         const pHValues = Object.values(data.Sensor3.pH);
  //         const waterLvlValues = Object.values(data.Sensor.waterlvl);

  //         setCo2(co2Values)
  //         setPH(pHValues)
  //         setWaterLvl(waterLvlValues)

  //     });
  // }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BG} resizeMode="cover" style={styles.image}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginBottom: 200,
          }}
        >
          {/* <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.rootContainer}>
              <Card text={pH[pH.length - 1]} unit={""} path="/Sensor3/pH" />
              <Card
                text={waterLvl[waterLvl.length - 1]}
                unit={"mm"}
                path="/Sensor/waterlvl"
              />
              <Card
                text={co2[co2.length - 1]}
                unit={"ppm"}
                path="/Sensor2/Gas"
              />
            </View>
          </ScrollView> */}

          <View style={styles.IconContainer1}>
            <Icon
              name="water"
              onPress={() =>
                navigation.navigate("ComaprisonScreen", {
                  mode: routes.WATERLVL,
                })
              }
            />
            <Icon
              name="ph"
              onPress={() =>
                navigation.navigate("ComaprisonScreen", {
                  mode: routes.PH,
                })
              }
            />
            <Icon
              name="molecule-co2"
              onPress={() =>
                navigation.navigate("ComaprisonScreen", {
                  mode: routes.CO2,
                })
              }
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ComaprisonScreen", {
                mode: routes.MIXED,
              })
            }
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderColor: "black",
                borderWidth: 1,

                alignItems: "center",
                justifyContent: "center",
                width: "40%",
                height: 50,
                borderRadius: 10,
                backgroundColor: "white",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>Compare</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default DataScreen;
const styles = StyleSheet.create({
  Textcontaner: {
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  rootContainer: {
    // backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: "row",
    height: 350,
    top: 100,
  },
  scrollContainer: {
    justifyContent: "space-between",
    // backgroundColor:"red",
    height: 350,
  },
  IconContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconContainer1: {
    // padding: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
