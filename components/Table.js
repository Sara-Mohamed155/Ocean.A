import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

function ExampleOne({
  tableHeadProp = ["Time", "CO2", "pH", "Water Level"],
  tableDataProp = [],
}) {
  const [tableHead, setTableHead] = useState(tableHeadProp);
  const [tableData, setTableData] = useState(tableDataProp);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});

export default ExampleOne;
