import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import Container from '../components/Container';
import MapCallout from '../components/MapCallout';
import Header from '../components/Text';
import { getUserCurrentLocation, getUserNearByPlaces, getUsersAtSelectedPlace } from '../actions';

//myLat:51.4182, myLon: -.9463

//location reducer - it has got following states
//userCurrentLocation = { lat, lon}
//userNearByPlaces = [] - array of near by places.


class NearByPlaces extends Component {

  componentWillMount() {
    console.log('****** componentWillMount NearByPlaces', this.props);
    if (this.props.fbUserDtails) {
      this.props.getUserCurrentLocation(this.props.fbUserDtails.id);
    };
  }

  componentDidMount() {
    console.log('****** componentDidMount NearByPlaces', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('****** componentWillReceiveProps NearByPlaces props: ', this.props);
    console.log('****** componentWillReceiveProps NearByPlaces nextProps: ', nextProps);
    if (nextProps.fbUserDtails && this.props.fbUserDtails == null) {
      this.props.getUserCurrentLocation(nextProps.fbUserDtails.id);
    };

  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log('****** shouldComponentUpdate NearByPlaces nextProps: ', nextProps);
    console.log('****** shouldComponentUpdate NearByPlaces nextState: ', nextState);
  }

  componentWillUpdate() {
    console.log('****** componentWillUpdate NearByPlaces', this.props);
  }

  componentDidUpdate() {
    console.log('****** componentDidUpdate NearByPlaces', this.props);
  }
  */

  goToLocationDetails = (place) => {
    //console.log('place: ', place);
    this.props.getUsersAtSelectedPlace(place, () => { this.props.navigation.navigate('PlaceDetails') } );
    //this.props.navigation.navigate('PlaceDetails');
  };

  renderPlaceMarker = () => {
    return this.props.userNearByPlaces.map((place) => {
      let { poiLatitude, poiLongitude } = place;

      let latitude = place.poiLatitude;
      let longitude = place.poiLongitude;
      
      return (
        <Marker key={place.poiId} coordinate={ {latitude, longitude} } title={place.poiName}>
          <Callout tooltip style={styles.calloutStyle}>
            <MapCallout
              title={place.poiName}
              description={place.totalUsers}
              onPress={() => this.goToLocationDetails(place)}
          />
          </Callout>
        </Marker>
      );
    })
  }

  renderMap = () => {
    //console.log('this.props.userCurrentLocation:' , this.props.userCurrentLocation)
    if (this.props.userCurrentLocation && this.props.userNearByPlaces) {
      const { latitude, longitude } = this.props.userCurrentLocation.coords;
      return (
        <MapView
          initialRegion={ {latitude: latitude, longitude: longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421  } }
          showsUserLocation
          style={styles.viewStyle} mapType='hybrid'
        >
          {this.renderPlaceMarker()}
        </MapView>
      );
    } else {
      return (
        <Text></Text>
      );
    }
  }



  render() {

    //console.log('NearByPlaces render:', this.props);

    return (
      <View style={styles.viewStyle}>
        { this.renderMap()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1
  },
  calloutStyle: {
    width:140
  }
}

const mapStateToProps = ( { location, auth }) => {
  console.log('*** mapStateToProps NearByPlaces location: ', location);
  console.log('*** mapStateToProps NearByPlaces auth: ', auth);
  const { userCurrentLocation, userNearByPlaces } = location
  const { fbUserDtails } = auth;
  return { userCurrentLocation, userNearByPlaces, fbUserDtails };
};

export default connect(mapStateToProps, { getUserCurrentLocation, getUserNearByPlaces, getUsersAtSelectedPlace })(NearByPlaces);
