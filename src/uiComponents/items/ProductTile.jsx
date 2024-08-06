import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../styles";

const ProductTile = ({ product }) => {
  const { rate, count } = product.rating || { rate: "N/A", count: 0 };

  return (
    <View style={styles.productTile}>
      <View style={styles.productTileImageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productTileImage}
        />
        <View style={styles.productTileRatingContainer}>
          <Text style={styles.productTileRating}>
            {rate} ★ | {count}
          </Text>
        </View>
      </View>
      <Text numberOfLines={2} style={styles.productTileTitle}>
        {product.title}
      </Text>
      <Text style={styles.productTilePrice}>${product.price}</Text>
    </View>
  );
};

export default ProductTile;
