import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles";

const PrimaryButton = ({ label, onPress, enabled }) => {
  return (
    <TouchableOpacity
      style={enabled ? styles.primaryButtonEnabled : styles.primaryButtonDisabled}
      onPress={onPress}
      enabled={enabled}>
      <Text style={enabled ? styles.primaryButtonText : styles.primaryButtonTextDisabled}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
