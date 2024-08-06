import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";

const CartItem = ({ product }) => {
  const { title, description, image, price, quantity } = product;

  return (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text numberOfLines={1} style={styles.cartItemTitle}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.cartItemDescription}>
          {description}
        </Text>
        <View style={styles.cartItemRow}>
          <Text style={styles.cartItemQuantity}>Quantity: {quantity}</Text>
          <Text style={styles.cartItemPrice}>
            ${(price * quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
