import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const MapCallout = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.bubble}>
        <View style={styles.amount}>
          <Text style={styles.headerText}>{props.title}</Text>
          <Text style={styles.text}>{props.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#3B5998',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  calloutContainer: {
    width: 140,
  },
  headerText: {
    color: '#181818',
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    color: '#181818',
    fontSize: 12,
  }
};

export default MapCallout;
