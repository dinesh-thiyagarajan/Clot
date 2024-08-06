import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles";

const CategoryItem = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.categoryItem}>
      <Image source={category.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{category.title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
