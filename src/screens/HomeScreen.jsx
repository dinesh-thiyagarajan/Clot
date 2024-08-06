import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import ProductTile from "../uiComponents/items/ProductTile";
import apiCall from "../network/ApiClient";
import Spacer from "../uiComponents/Spacer";
import CategoryItem from "../uiComponents/items/CategoryItem";
import categoryData from "../data/mock/CategoriesList";
import {ScrollView} from "react-native-gesture-handler";
import Heading from "../uiComponents/text/Heading";
import Strings from "../appConstants/strings";
import styles from "../uiComponents/styles";
import Route from "../navigation/routes";
import ApiConstants from "../network/ApiConstants";
import SearchBar from "../uiComponents/SearchBar";

export default function HomeScreen({navigation}) {
    const [productList, setProductList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await apiCall(ApiConstants.PRODUCTS, "GET");
                setProductList(response);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            }
        };
        getProducts();
    }, []);

    const renderProduct = ({item}) => (
        <ProductTile key={item.id} product={item}/>
    );

    const renderCategory = ({item}) => (
        <CategoryItem
            key={item.id}
            category={item}
            onPress={() => handlePress(item)}
        />
    );

    const handlePress = (category) => {
        console.log(category)
        navigation.navigate(Route.VIEW_CATEGORY_SCREEN, {category});
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const [searchTerm, setSearchTerm] = useState('');
    return (
        <View style={styles.homeContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}>
                <Spacer height={100}/>
                <SearchBar
                    placeholder="Search"
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                />
                <Heading text={Strings.CATEGORIES}></Heading>
                <Spacer height={20}/>
                <FlatList
                    data={categoryData}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={renderCategory}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Heading text={Strings.TRENDING_NOW}></Heading>
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
        </View>
    );
}
