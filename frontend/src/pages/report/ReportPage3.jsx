import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import reportPageImg from "./ReportAssets/report-page2-img.png";

// Create styles
const styles = StyleSheet.create({
  pageBox: {
    position: "absolute",
    top: 30,
    left: 40,
    width: 532,
    height: 712,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 4,
  },
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
    width: 492,
    position: "absolute",
    flexDirection: "column",
    gap: "10px",
    top: 20,
    left: 20,
  },
  tableHeader: {
    backgroundColor: "#00CC9C",
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    borderRadius: 4,
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
  reportCounterStyles: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    right: 16,
    fontSize: 10,
    color: "#11111180",
  },
});

const ReportPage3 = ({
  mapImage,
  top10Emissions,
  top5BusinessUnitEmissions,
  companyName,
}) => {
  return (
    <Page
      size={["612", "792"]}
      style={{ position: "relative", backgroundColor: "#EDFAFF" }}
    >
      <Image src={reportPageImg} />
      <View style={styles.pageBox}>
        <View style={styles.tableContainer1}>
          <Text style={styles.heading}>
            Top 5 business units with highest emissions
          </Text>
          <View style={{ width: "100%" }}>
            <View style={{ ...styles.tableHeader, ...styles.tableHeaderRow }}>
              {["Business Unit", "Total Emisstions"].map((item) => (
                <Text key={item} style={styles.td}>
                  {item}
                </Text>
              ))}
            </View>
            {top5BusinessUnitEmissions.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.tableBodyRow,
                  index < top5BusinessUnitEmissions.length - 1 &&
                    styles.borderBottom,
                ]}
              >
                <Text style={styles.td}>{item.businessUnitTitle}</Text>
                <Text style={styles.td}>{item.totalEmissions}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ ...styles.tableContainer1, top: 205 }}>
          <Text style={styles.heading}>
            Top 10 emission activities for Choco Lux Ltd.
          </Text>
          <View style={{ width: 492 }}>
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
                {
                  item.CO2e &&
                <Text style={styles.td}>{item.CO2e.toFixed(2)}</Text>
                }
              </View>
            ))}
          </View>
        </View>
        {/* <Image src={emissionsImage} style={styles.emissionsImage} /> */}
        <View style={{ ...styles.tableContainer1, top: 450, width: 512 }}>
          <Text style={styles.heading}>
            Regional emissions heat map for Choco Lux Ltd.
          </Text>
          {mapImage && (
            <Image src={mapImage} style={{ width: "100%", height: "217px" }} />
          )}
        </View>
      </View>
      <View style={styles.reportCounterStyles}>
        <Text>
          {companyName && companyName + "."} Carbon Accounting Report |{" "}
          <Text style={{ color: "#197EC6" }}>2</Text>
        </Text>
      </View>
      <View
        style={{
          ...styles.headerBar,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <View style={styles.bar2}></View>
        <View style={styles.bar1}></View>
      </View>
    </Page>
  );
};

export default ReportPage3;
