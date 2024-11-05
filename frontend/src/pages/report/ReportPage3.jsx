import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import emissionsImage from "./ReportAssets/report-emissions-img.png";

// Create styles
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    height: "10px",
  },
  bar1: {
    width: "149px",
    backgroundColor: "#197EC6",
  },
  bar2: {
    width: "225px",
    backgroundColor: "#00CC9C",
  },
  heading: {
    fontSize: "16px",
    color: "#197EC6",
    fontWeight: 600,
  },
  tableContainer1: {
    position: "absolute",
    flexDirection: "column",
    gap: "10px",
    top: 48,
    left: 40,
  },
  tableHeader: {
    backgroundColor: "#00CC9C",
    flexDirection: "row",
    alignItems: "center",
    color: "white",
  },
  tableHeaderRow: {
    fontSize: "8px",
    fontWeight: 600,
    height: "18px",
    paddingHorizontal: "10px",
  },
  tableBodyRow: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: "6px",
    fontWeight: 600,
    height: "18px",
    paddingHorizontal: "10px",
  },
  td: {
    width: "100%",
  },
  borderBottom: {
    borderBottom: "0.2px solid #1A1A1A",
  },
  mapStyles: {
    height: "217px",
    width: "100%",
    backgroundColor: "gray",
  },
  emissionsView: {
    position: "absolute",
    flexDirection: "column",
    gap: 5,
    top: 10,
    right: 10,
  },
  emissionsImage: {
    width: "178px",
    height: "243px",
    position: "absolute",
    right: 0,
    top: 0,
  },
  emissionsHeading: {
    fontSize: "12px",
    color: "rgb(17,17,17)",
  },
  emissionsPersontage: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "8px",
  },
});

const tableData = [
  { name: "Silk Chocolate", emissions: 300 },
  { name: "Dark Chocolate", emissions: 250 },
  { name: "Milk Chocolate", emissions: 200 },
  { name: "White Chocolate", emissions: 150 },
  { name: "Bitter Chocolate", emissions: 100 },
];

// const tableData2 = [
//   {
//     scope: "Scope 3",
//     activity: "Business Travel",
//     type: "Air Travel",
//     class: "Business class",
//     emissions: 5500,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Train Travel",
//     type: "Rail",
//     class: "First class",
//     emissions: 2500,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Car Travel",
//     type: "Personal Vehicle",
//     class: "Standard",
//     emissions: 3000,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Taxi Rides",
//     type: "Ride-sharing",
//     class: "Economy",
//     emissions: 1200,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Food Delivery",
//     type: "Fast Food",
//     class: "Standard",
//     emissions: 800,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Client Meetings",
//     type: "In-Person",
//     class: "Business class",
//     emissions: 4000,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Conferences",
//     type: "Air Travel",
//     class: "Economy",
//     emissions: 3500,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Workshops",
//     type: "Rail",
//     class: "Economy",
//     emissions: 1000,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Site Visits",
//     type: "Car",
//     class: "Standard",
//     emissions: 600,
//   },
//   {
//     scope: "Scope 3",
//     activity: "Employee Relocation",
//     type: "Air Travel",
//     class: "Business class",
//     emissions: 7000,
//   },
// ];

const ReportPage3 = ({ mapImage, top10Emissions }) => {
  return (
    <Page size={["612", "792"]} style={{ position: "relative" }}>
      <View style={styles.headerBar}>
        <View style={styles.bar1}></View>
        <View style={styles.bar2}></View>
      </View>
      <View style={styles.tableContainer1}>
        <Text style={styles.heading}>
          Top 5 business units with highest emissions
        </Text>
        <View style={{ width: "328px" }}>
          <View style={{ ...styles.tableHeader, ...styles.tableHeaderRow }}>
            {["Business Unit", "Total Emisstions"].map((item) => (
              <Text key={item} style={styles.td}>
                {item}
              </Text>
            ))}
          </View>
          {tableData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableBodyRow,
                index < tableData.length - 1 && styles.borderBottom,
              ]}
            >
              <Text style={styles.td}>{item.name}</Text>
              <Text style={styles.td}>{item.emissions}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ ...styles.tableContainer1, top: 225 }}>
        <Text style={styles.heading}>
          Top 10 emission activities for Choco Lux Ltd.
        </Text>
        <View style={{ width: "532px" }}>
          <View style={{ ...styles.tableHeader, ...styles.tableHeaderRow }}>
            {[
              "Scope",
              "Business Unit",
              "Scope Category",
              "UOM",
              "Emissions(Tonnes)",
            ].map((item) => (
              <Text key={item} style={styles.td}>
                {item}
              </Text>
            ))}
          </View>
          {top10Emissions?.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableBodyRow,
                index < top10Emissions?.length - 1 && styles.borderBottom,
              ]}
            >
              <Text style={styles.td}>{item.scope}</Text>
              <Text style={styles.td}>{item.businessUnit}</Text>
              <Text style={styles.td}>{item.level1Category}</Text>
              <Text style={styles.td}>{item.unitOfMeasurement}</Text>
              <Text style={styles.td}>{item.CO2e}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image src={emissionsImage} style={styles.emissionsImage} />
      <View style={{ ...styles.tableContainer1, top: "507px", width: "532px" }}>
        <Text style={styles.heading}>
          Regional emissions heat map for Choco Lux Ltd.
        </Text>
        {mapImage && (
          <Image src={mapImage} style={{ width: "100%", height: "auto" }} />
        )}
      </View>
    </Page>
  );
};

export default ReportPage3;
