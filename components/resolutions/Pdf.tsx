import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Showdown from "showdown";
import { ResolutionEntityEnhanced } from "types";

import React from "react";
import Html from "react-pdf-html";

const converter = new Showdown.Converter();
converter.setFlavor("github");

// Create styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: "14px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "ultrabold",
    marginBottom: "2px",
  },
  subTitle: {
    fontSize: "12px",
    marginBottom: "16px",
  },
  content: {
    fontSize: "12px",
    maxWidth: "90%",
  },
  note: {
    fontSize: "10px",
    color: "#999",
  },
  signature: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  headerInfo: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "9px",
    marginBottom: "16px",
    borderBottom: "1px solid #999",
    borderTop: "1px solid #999",
    padding: "8px",
  },
});

const initGetUserName = (usersData: any[]) => (ethereumAddress: string) =>
  usersData.find((user) => user.ethereumAddress === ethereumAddress)?.name;

// Create Document Component
const ResolutionPdf = ({ resolution, usersData }: { resolution: ResolutionEntityEnhanced; usersData: any[] }) => {
  const getUserName = initGetUserName(usersData);
  const contentHtml = converter.makeHtml(resolution.content);
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <Text style={styles.headerTitle}>
          MINUTES AND RESOLUTION OF THE SHAREHOLDERS (without convening a meeting of shareholders)
        </Text>
        <View style={styles.headerInfo} wrap={false}>
          <View style={{ width: "70%" }}>
            <Text>Time of determining the voting rights and active PoAs: 02 Mar 2023</Text>
            <Text>Notification period for voting: From 02 Mar 2023, 13:20:50 to 05 Mar 2023, 13:20:50</Text>
            <Text>Voting period: From 05 Mar 2023, 13:20:50 to 07 Mar 2023, 13:20:50</Text>
            <Text>Place of voting: https://dapp-neokingdom.vercel.app/resolutions/15</Text>
            <Text>Recording secretary: Benjamin Gregor Uphues</Text>
          </View>
          <View style={{ width: "30%", textAlign: "right" }}>
            <Text>Business name: neokingdom DAO OÜ</Text>
            <Text>Registry code: 16638166</Text>
            <Text>Registered office: Laki 11/1, 12915 Tallinn, Estonia</Text>
          </View>
        </View>
        <Text style={styles.title}>
          Topic of the resolution: #{resolution.id} {resolution.title}
        </Text>
        <Text style={styles.subTitle}>
          Created on {resolution.createdAt} by {getUserName(resolution.createBy)}
        </Text>
        <Text style={styles.title}>Content of the resolution:</Text>
        <View style={styles.content}>
          <Html style={styles.content}>{contentHtml}</Html>
        </View>
        <View fixed style={styles.signature}>
          <Text style={styles.note}>/signed digitally/</Text>
          <Text style={styles.note}>--------------------------------------</Text>
          <Text style={styles.note}>Benjamin Gregor Uphues</Text>
          <Text style={styles.note}>Member of management board</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResolutionPdf;
