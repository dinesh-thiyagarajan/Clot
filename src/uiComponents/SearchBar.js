import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const SearchBar = ({placeholder, onChangeText, value}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder || "Search"}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
    },
    input: {
        height: 25,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});

export default SearchBar;
