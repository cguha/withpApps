import React, { Component } from 'react';
import { View, Text, Slider, StyleSheet, Switch, Button } from 'react-native';
import { connect } from 'react-redux';
import Container from '../components/Container';
import Header from '../components/Text';
import { searchGenderChange, ageChange, distanceChange, showMeChange, saveSettings } from '../actions';

class Settings extends Component {

  saveButtonPressed = () => {
    console.log(this.props);
    const { distance, age, searchGender, showMe } = this.props;
    this.props.saveSettings( {distance, age, searchGender, showMe} );
  }

  distanceChange = (value) => {
    //console.log('value: ', value);
    this.props.distanceChange(value);
  }

  ageChange = (value) => {
    //console.log('value: ', value);
    this.props.ageChange(value);
  }

  searchGenderChange = (value) => {
    //console.log('value: ', value);
    this.props.searchGenderChange(value);
  }

  showMeChange = (value) => {
    //console.log('value: ', value);
    this.props.showMeChange(value);
  }

  render() {
    return (
      <View style={ styles.cardStyle }>

        <View style={styles.cardSectionStyle}>
          <View style={styles.labelStyle}>
            <Text>My Gender:</Text>
          </View>
          <View style={styles.dataStyle}>
            <Text>Man</Text>
          </View>
        </View>

        <View style={styles.cardSectionStyle}>
          <View style={styles.labelStyle}>
            <Text>Search Gender:</Text>
          </View>
          <View style={styles.dataStyle}>
            <Text>Woman > </Text>
          </View>
        </View>

        <View style={styles.cardSectionStyle}>
            <View style={styles.viewHorizontal}>
              <Text>Age: {this.props.age}</Text>
              <Slider style={styles.sliderStyle} minimumValue={18} maximumValue={60} step={1}
                value={this.props.age}
                onValueChange={this.ageChange.bind(this)}
              />
            </View>
        </View>

        <View style={styles.cardSectionStyle}>
            <View style={styles.viewHorizontal}>
              <Text>Distance: {this.props.distance}</Text>
              <Slider style={styles.sliderStyle} minimumValue={1} maximumValue={10} step={1}
                value={this.props.distance}
                onValueChange={this.distanceChange.bind(this)}
              />
            </View>
        </View>

        <View style={styles.cardSectionStyle}>
          <View style={styles.labelStyle}>
            <Text>Show Me: </Text>
          </View>
          <View style={styles.dataStyle}>
            <Switch value={this.props.showMe} onValueChange={this.showMeChange.bind(this)}/>
          </View>
        </View>

        <View style={styles.cardSectionStyle}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="Save Settings" onPress={this.saveButtonPressed}/>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 2,
    borderColor: 'green',
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30
  },
  cardSectionStyle: {
    flex: 1,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'green'
  },
  labelStyle: {
    flex: 1,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 10
  },
  dataStyle: {
    flex: 1,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0
  },
  sliderStyle: {
    height: 5,
    width: 350,
    flex: 1,
    margin: 0
  },
  viewHorizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderWidth: 0,
    borderColor: 'pink'
  }
});

const mapStateToProps = ( {settings} ) => {
  //console.log('Settings mapStateToProps', settings);
  const { searchGender, age, distance, showMe, saveSettings } = settings;
  return ( {searchGender, age, distance, showMe, saveSettings });
};

export default connect(mapStateToProps, { searchGenderChange, ageChange, distanceChange, showMeChange, saveSettings })(Settings);
