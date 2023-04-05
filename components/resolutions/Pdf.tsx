import { Document, Note, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
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
    paddingBottom: 40,
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
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
});

// Create Document Component
const ResolutionPdf = ({ resolution }: { resolution: ResolutionEntityEnhanced }) => {
  const html = converter.makeHtml(resolution.content);
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <Text style={styles.title}>
          #{resolution.id} {resolution.title}
        </Text>
        <View style={styles.content}>
          <Html style={styles.content}>{html}</Html>
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
