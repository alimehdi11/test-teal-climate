import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import reportPage2Img from "./ReportAssets/report-page2-img.png";
import EmployeeIcon from "./ReportAssets/EmployeeIcon";
import EmployeeRevenueIcon from "./ReportAssets/EmployeeRevenueIcon";
import Briefcase from "./ReportAssets/Briefcase";
const ReportPage2 = ({ charts }) => {
  const { pieChart, scope1Chart, scope2Chart, scope3Chart } = charts;
  const emissionData = [
    { label: "Scope 1", value: "2564.92", color: "bg_blue" },
    { label: "Scope 2", value: "1500.00", color: "bg_green" },
    { label: "Scope 3", value: "750.50", color: "bg_yellow" },
  ];
  const Scope1Emissions = [
    {
      title: "Stationary Combustion",
      color: "bg_blue",
    },
    {
      title: "Mobile Combustion",
      color: "bg_yellow",
    },
    {
      title: "Fugitive Emissions",
      color: "bg_red",
    },
  ];
  const Scope2Emissions = [
    {
      title: "Purchased Electricity",
      color: "bg_blue",
    },
    {
      title: "Heat & Steam",
      color: "bg_yellow",
    },
  ];

  const Scope3Emissions = [
    { title: "Purchased Goods And Services", color: "#197EC6" },
    { title: "Capital Goods", color: "#A5A6F6" },
    { title: "Fuel & Energy Related Activities", color: "#5D5FEF" },
    { title: "Upstream Transportation And Distribution", color: "#EB5757" },
    { title: "Waste Generated In Operations", color: "#85E0AB" },
    { title: "Business Travel", color: "#219653" },
    { title: "Employee Commuting", color: "#56CCF2" },
    { title: "Upstream Leased Assets", color: "#BB6BD9" },
    { title: "Downstream Transportation And Distribution", color: "#FD8BFF" },
    { title: "Processing Of Sold Products", color: "#E6BA1F" },
    { title: "Use Of Sold Products", color: "#32B950" },
    { title: "End-Of-Life Treatment Of Sold Products", color: "#1F8A7D" },
    { title: "Downstream Leased Assets", color: "#00CC9C" },
    { title: "Franchises", color: "#FFCA2A" },
    { title: "Investments", color: "#FFA400" },
  ];

  const emissions = [
    {
      icon: <EmployeeIcon />,
      title: "Emissions per Employee",
      value: "300.00",
    },
    {
      icon: <EmployeeRevenueIcon />,
      title: "Emissions per Revenue",
      value: "300.00",
    },
    {
      icon: <Briefcase />,
      title: "Emissions per Product",
      value: "300.00",
    },
  ];

  const styles = StyleSheet.create({
    pageBox: {
      position: "absolute",
      top: 30,
      left: 30,
      width: 532,
      height: 712,
      backgroundColor: "white",
      padding: 20,
    },
    h1: {
      fontWeight: 600,
      fontSize: 16,
      color: "#197EC6",
    },
    h2: {
      fontSize: 10,
    },
    text: {
      fontWeight: 400,
      fontSize: 8,
      marginTop: 4,
      lineHeight: 1.6,
    },
    emissionBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    my: {
      marginVertical: 5,
    },
    circle: {
      width: 5,
      height: 5,
      borderRadius: "50%",
    },
    emissionSmallBox: {
      gap: 10,
    },
    circleWithTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
    },
    pieChartStyles: {
      width: 150,
      height: 150,
      objectFit: "cover",
    },
    emissionWithIconsBox: {
      gap: 10,
      border: "0.5px solid #197EC6",
      paddingHorizontal: 14,
      paddingVertical: 10,
      position: "absolute",
      right: 20,
      top: 43,
    },
    hr: {
      position: "absolute",
      top: 248,
      left: 0,
      width: "100%",
      height: "1px",
      backgroundColor: "#0000001A",
    },
    bg_blue: {
      backgroundColor: "#165DFF",
    },
    bg_yellow: {
      backgroundColor: "#FFCA2A",
    },
    bg_red: {
      backgroundColor: "#EB5757",
    },
    bg_green: {
      backgroundColor: "#00CC9C",
    },
    scopesChartStyles: {
      width: 74,
      height: 100,
    },
  });
  return (
    <Page
      size={["612", "792"]}
      style={{ position: "relative", backgroundColor: "#E5E7EB" }}
    >
      <Image src={reportPage2Img} />
      <View style={styles.pageBox}>
        <View>
          <View style={{ width: 348 }}>
            <Text style={styles.h1}>Introduction</Text>
            <Text style={styles.text}>
              This report provides an overview of Choco Lux Ltd. ‘s greenhouse
              gas emissions. It is an integrated part of Choco Lux Ltd.’s
              climate strategy. The core purpose of the report is to identify
              key emission areas and seasonal spikes. These analytics serve as
              basis for a comprehensive GHG emissions reduction plan. The total
              emissions from Choco Lux Ltd.’s all business units during the
              period: 1 January 2023 to 31 December, are 990 tonnes CO2e.
            </Text>
            <View style={styles.emissionBox}>
              <View>
                <Text style={{ ...styles.h2, color: "#00CC9C", ...styles.my }}>
                  Total Emissions
                </Text>
                <Text style={{ ...styles.h1, fontSize: 18 }}>
                  2564.92
                  <Text style={styles.text}>CO2e</Text>
                </Text>
                <View style={{ flexDirection: "row", gap: 25, ...styles.my }}>
                  {emissionData.map((item, index) => (
                    <View key={index}>
                      <View style={styles.circleWithTitle}>
                        <View
                          style={{
                            ...styles.circle,
                            ...styles[item.color],
                          }}
                        />
                        <Text style={styles.text}>{item.label}</Text>
                      </View>
                      <View style={{ ...styles.h1, fontSize: 14 }}>
                        <Text>{item.value}</Text>
                        <Text style={{ ...styles.text, fontSize: 6 }}>
                          CO2e
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              {pieChart && (
                <Image src={pieChart} style={styles.pieChartStyles} />
              )}
            </View>
          </View>
        </View>
        <View style={styles.emissionWithIconsBox}>
          {emissions.map((emission, index) => (
            <View key={index}>
              <View style={styles.circleWithTitle}>
                {emission.icon}
                <Text style={styles.text}>{emission.title}</Text>
              </View>
              <View style={{ ...styles.h1, fontSize: 14 }}>
                <Text>{emission.value}</Text>
                <Text style={{ ...styles.text, fontSize: 6 }}>CO2e</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.hr} />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 272,
            width: "100%",
          }}
        >
          <View style={{ flexBasis: "50%", flexDirection: "row", gap: 10 }}>
            <View>
              <Text style={styles.h1}>Scope 1 Emissions</Text>
              <View style={{ ...styles.text, color: "#111111B2" }}>
                <Text>Direct emissions from owned or</Text>
                <Text style={{ position: "relative", top: -2 }}>
                  controlled sources.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 180,
                }}
              >
                <View>
                  {Scope1Emissions.map((item) => (
                    <View style={styles.circleWithTitle}>
                      <View
                        style={{
                          ...styles.circle,
                          ...styles[item.color],
                        }}
                      />
                      <Text style={styles.text}>{item.title}</Text>
                    </View>
                  ))}
                </View>
                <View>
                  <Text style={styles.text}>10%</Text>
                  <Text style={styles.text}>10%</Text>
                  <Text style={styles.text}>10%</Text>
                </View>
              </View>
            </View>
            {scope1Chart && (
              <Image src={scope1Chart} style={styles.scopesChartStyles} />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <View>
              <Text style={styles.h1}>Scope 2 Emissions</Text>
              <View style={{ ...styles.text, color: "#111111B2" }}>
                <Text>Indirect emissions from purchased</Text>
                <Text style={{ position: "relative", top: -2 }}>
                  electricity, heat, and steam.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 180,
                }}
              >
                <View>
                  {Scope2Emissions.map((item) => (
                    <View style={styles.circleWithTitle}>
                      <View
                        style={{
                          ...styles.circle,
                          ...styles[item.color],
                        }}
                      />
                      <Text style={styles.text}>{item.title}</Text>
                    </View>
                  ))}
                </View>
                <View>
                  <Text style={styles.text}>10%</Text>
                  <Text style={styles.text}>10%</Text>
                </View>
              </View>
            </View>
            {scope2Chart && (
              <Image src={scope2Chart} style={styles.scopesChartStyles} />
            )}
          </View>
        </View>
        <View style={{ ...styles.hr, top: 380 }} />
        <View style={{ position: "absolute", top: 390 }}>
          <Text style={styles.h1}>Scope 3 Emissions</Text>
          <View style={{ ...styles.text, color: "#111111B2" }}>
            <Text>
              Indirect emissions across the value chain, arising from activities
              such as purchased goods
            </Text>
            <Text style={{ position: "relative", top: -2 }}>
              Production, transportation, waste management, and product
              end-of-life treatment.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 437,
              }}
            >
              <View>
                {Scope3Emissions.map((item) => (
                  <View style={styles.circleWithTitle}>
                    <View
                      style={{
                        ...styles.circle,
                        backgroundColor: item.color,
                      }}
                    />
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                ))}
              </View>
              <View>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
                <Text style={styles.text}>10%</Text>
              </View>
            </View>
            {scope3Chart && (
              <Image
                src={scope3Chart}
                style={{
                  ...styles.scopesChartStyles,
                  height: "100%",
                  marginLeft: 20,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Page>
  );
};

export default ReportPage2;
