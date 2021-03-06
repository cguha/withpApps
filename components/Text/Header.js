import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const Header = (props) => {
  return (
    <Text style={styles.styleText}>
      {props.children}
    </Text>
  );
}

export default Header;
