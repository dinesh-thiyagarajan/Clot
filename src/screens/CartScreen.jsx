import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import Spacer from "../uiComponents/Spacer";
import Heading from "../uiComponents/text/Heading";
import Strings from "../appConstants/strings";
import PrimaryButton from "../uiComponents/buttons/PrimaryButton";
import CartItem from "../uiComponents/items/CartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../uiComponents/styles";

const CartScreen = () => {
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserCartProducts = async () => {
      try {
        const userId = 1;
        const cartResponse = await fetch(
          `https://fakestoreapi.com/carts/user/${userId}`
        );
        const cartData = await cartResponse.json();

        const cartProducts = cartData.flatMap((cart) =>
          cart.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          }))
        );

        const productPromises = cartProducts.map(({ productId }) =>
          fetch(`https://fakestoreapi.com/products/${productId}`).then((res) =>
            res.json()
          )
        );

        const products = await Promise.all(productPromises);

        const productsWithDetails = cartProducts.map((cartProduct) => {
          const product = products.find((p) => p.id === cartProduct.productId);
          return {
            ...product,
            quantity: cartProduct.quantity,
          };
        });

        const uniqueProducts = productsWithDetails.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );

        setProductList(uniqueProducts);
        console.log(uniqueProducts);
      } catch (err) {
        setError("Failed to load cart products");
        console.error(err);
      }
    };
    getUserCartProducts();
  }, []);

  const renderProduct = ({ item }) => <CartItem product={item} />;

  if (error) {
    return (
      <SafeAreaView style={styles.cartContainer}>
        <View style={styles.cartErrorContainer}>
          <Text style={styles.cartErrorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.cartContainer}>
      <View style={styles.cartInnerContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productList}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <View style={styles.cartFooter}>
              <Spacer height={20} />
              <Heading style={styles.cartHeader} text={Strings.MY_CART} />
            </View>
          )}
          contentContainerStyle={styles.cartProductContainer}
        />
        <View style={styles.cartFooter}>
          <PrimaryButton
            enabled={true}
            label={Strings.CHECKOUT}
            style={styles.button}
          />
          <Spacer height={20} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
