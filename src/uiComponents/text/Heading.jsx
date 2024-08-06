import React from "react";
import { Text } from "react-native";
import styles from "../styles";

const Heading = ({ text }) => {
  return <Text style={styles.heading}>{text}</Text>;
};

export default Heading;
