import React from "react";
import { TextInput } from "react-native";
import styles from "../styles";

const PrimaryTextInput = ({
  placeholder,
  onTextChange,
  shouldHide,
  maxLength,
  value,
  editable = true, // Default to true if not provided
}) => {
  return (
    <TextInput
      style={styles.primaryTextInput}
      placeholder={placeholder}
      onChangeText={onTextChange}
      secureTextEntry={shouldHide}
      maxLength={maxLength}
      value={value}
      editable={editable} // Control the editability based on the prop
    />
  );
};

export default PrimaryTextInput;
