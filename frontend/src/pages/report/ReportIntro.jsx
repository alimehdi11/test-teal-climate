import React from "react";
import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import reportIntroImg from "./ReportAssets/reportIntroImg.png";
import TealClimateLogo1 from "./ReportAssets/TealClimateLogo1";
import TealClimateLogo2 from "./ReportAssets/TealClimateLogo2";

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 510,
    left: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(17,17,17,0.6)",
  },

  divider: {
    width: 154,
    height: 4,
    backgroundColor: "#00CC9C",
    marginTop: 5,
    borderRadius: 100,
  },
  logoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  image: {
    width: "100%",
    height: "auto",
  },
  logo1: {
    position: "absolute",
    left: 40,
    bottom: 40,
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logo2: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

// Create Document Component
const MyDocument = ({ reportIntroData }) => (
  <Page size={["612", "792"]} style={{ position: "relative" }}>
    <Image src={reportIntroImg} style={styles.image} />
    <View style={styles.header}>
      {!!reportIntroData.companyName && (
        <Text style={styles.title}>{reportIntroData.companyName}.</Text>
      )}

      <Text style={styles.subtitle}>
        Carbon Accounting Report {new Date().getFullYear()}
      </Text>
      <View style={styles.divider} />
      <Text style={{ ...styles.subtitle, marginVertical: 5 }}>
        {reportIntroData.currentPeriod?.period}
      </Text>
    </View>
    <View style={styles.logo1}>
      <TealClimateLogo1 />
    </View>
    <View style={styles.logo2}>
      <TealClimateLogo2 />
    </View>
  </Page>
);

export default MyDocument;
