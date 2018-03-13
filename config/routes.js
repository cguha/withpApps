import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';

import Login from '../screens/Login';
import NearByPlaces from '../screens/NearByPlaces';
import Settings from '../screens/Settings';
import TopCrowdedPlaces from '../screens/TopCrowdedPlaces';
import Profile from '../screens/Profile';
import PlaceDetails from '../screens/PlaceDetails';
import UserDetails from '../screens/UserDetails';
import Auth from '../screens/Auth';

export const NearByPlacesStack = StackNavigator(
  {
    NearByPlaces: { screen: NearByPlaces, navigationOptions: { title: 'Places'} },
    PlaceDetails: { screen: PlaceDetails, navigationOptions: { title: 'Place Details'}},
    UserDetails: { screen: UserDetails, navigationOptions: { title: 'User Details'}}
  },
  { headerMode: 'screen'}
);

export const TabsStack = TabNavigator(
  {
    NearByPlacesStack: { screen: NearByPlacesStack },
    Settings: { screen: Settings, navigationOptions: { tabBarLabel:'Settings', title: 'Settings' }},
    TopCrowdedPlaces: { screen: TopCrowdedPlaces, navigationOptions: {tabBarLabel:'Top Crowded', title: 'Top Crowded'}},
    Profile: { screen: Profile, navigationOptions: { tabBarLabel:'Profile', title: 'Profile' }}
  },
  { tabBarPosition: 'bottom', tabBarComponent: TabBarBottom}
);

export const MainNavigator = TabNavigator(
  {
    Login: { screen: Login, navigationOptions: { title: 'Login'} },
    Tabs: { screen: TabsStack }
  },
  { navigationOptions: {tabBarVisible: false} }
);
