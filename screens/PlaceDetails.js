import React, { Component } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Container from '../components/Container';
import Header from '../components/Text';
import { connect } from 'react-redux';
import { getUsersAtSelectedPlace } from '../actions';

class PlaceDetails extends Component {

  goToUserDetails = (user) => {
    //console.log('user: ',user);
    this.props.navigation.navigate('UserDetails');
  }

  renderPlaceDetails = () => {
    return (
      <View>
        <Text>{this.props.selectedPlaceDetails.poiName} is a {this.props.selectedPlaceDetails.poiType}</Text>
        <Text>{this.props.selectedPlaceDetails.poiAddress}</Text>
        <Text>There are {this.props.selectedPlaceDetails.totalUsers} Users at this place</Text>
      </View>
    );
  };

  renderUsersAtThisPlace = () => {
    return this.props.usersAtSelectedPlace.map( (user) => {
      return (
        <TouchableHighlight key={user.profileId}
          onPress={() => {
            this.goToUserDetails(user);
          }}
        >
          <ListItem
            roundAvatar
            avatar={{uri: user.profileId}}
            title={user.name}
            subtitle={user.familyName}
          />
        </TouchableHighlight>
      );
    })
  };

  render() {
    return (
      <ScrollView style={ styles.cardStyle }>
        <View style={ styles.cardSectionStyle }>
          {this.renderPlaceDetails()}
        </View>

        <View style={ styles.cardSectionStyle }>
          <List containerStyle={{flex:1}}>
            {this.renderUsersAtThisPlace()}
          </List>
        </View>
      </ScrollView>
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
    marginLeft: 1,
    marginRight: 1,
    marginTop: 0
  },
  cardSectionStyle: {
    flex: 1,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 1,
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


const mapStateToProps = ( { place }) => {
  console.log('mapStateToProps PlaceDetails place: ', place)
  const { usersAtSelectedPlace, selectedPlaceDetails } = place;
  return { usersAtSelectedPlace, selectedPlaceDetails};
};

export default connect(mapStateToProps, { getUsersAtSelectedPlace })(PlaceDetails);
