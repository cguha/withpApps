import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card } from 'react-native-elements';
import Container from '../components/Container';
import Header from '../components/Text';
import { PrimaryButton } from '../components/Form';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions';
import { AsyncStorage } from 'react-native';

class Login extends Component {

  async componentWillMount() {
    //AsyncStorage.removeItem('fb_token');
    console.log('**** componentWillMount Login fbToken:', this.props.fbToken)
    let token = AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.facebookLogin(() => { this.props.navigation.navigate('Tabs') });
    }
  };


  validateLogin = () => {
    this.props.facebookLogin(() => { this.props.navigation.navigate('Tabs') });
  };


  render() {
    console.log('*** login render props: ', this.props);
    return (
      <Container>
        <Card>
          <Button title="Login via Facebook" onPress={this.validateLogin} />

        </Card>
      </Container>

    );
  }
}

const mapStateToProps = ( {auth} ) => {
  console.log('login mapStateToProps auth: ', auth);
  const { fbToken } = auth;
  return { fbToken };
};



export default connect(mapStateToProps, {facebookLogin} )(Login);
