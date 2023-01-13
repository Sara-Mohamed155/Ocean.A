export const modes = {
  mixed: {
    iconName: "tune",
    title: "Mixed",
    color: "black",
  },
  co2: {
    path: "/Sensor2/CO2",
    legend: "CO2",
    iconName: "molecule-co2",
    color: "black",
    title: "CO2",
  },
  waterlvl: {
    path: "/Sensor/waterlvl",
    legend: "Water level",
    iconName: "water",
    color: "blue",
    title: "Water level",
  },
  pH: {
    path: "/Sensor3/pH",
    legend: "pH",
    iconName: "ph",
    color: "red",
    title: "pH",
  },
};

export const routes = {
  CO2: "co2",
  WATERLVL: "waterlvl",
  PH: "pH",
  MIXED: "mixed",
};
