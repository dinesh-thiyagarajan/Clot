import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import ProductTile from "../uiComponents/items/ProductTile";
import Spacer from "../uiComponents/Spacer";
import { ScrollView } from "react-native-gesture-handler";
import Heading from "../uiComponents/text/Heading";
import styles from "../uiComponents/styles";
import BackButton from "../uiComponents/buttons/BackButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default ViewCategoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(category.param);
    const getProducts = async () => {
      try {
        fetch(`https://fakestoreapi.com/products/category/${category.param}`)
          .then((res) => res.json())
          .then((json) => setProductList(json));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    };
    getProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <ProductTile key={item.id} product={item} />
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.viewCategoryContainer}>
      <BackButton navigation={navigation}></BackButton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <Spacer height={20} />
        <Heading text={category.title}></Heading>
        <FlatList
          data={productList}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
