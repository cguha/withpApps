import React from 'react';
import { Button } from 'react-native-elements';
import styles from './styles';

const PrimaryButton = (props) => {
  //console.log('button props: ', props);
  return (
    <Button large buttonStyle={styles.primaryButton} title={props.myTitle} onPress={props.myOnPress} />
  );
};

export default PrimaryButton;
