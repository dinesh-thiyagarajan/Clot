import React from 'react';
import { Text } from 'react-native';
import styles from '../styles';

const Title = ({text}) => {
    return <Text style={styles.title}>{text}</Text>;
}

export default Title;


