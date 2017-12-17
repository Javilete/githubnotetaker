import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, ActivityIndicator } from 'react-native';
import api from '../Utils/api';
import Dashboard from './Dashboard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 25,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  searchInput: {
    fontSize: 25,
    height: 50,
    padding: 4,
    marginRight: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    color: 'white',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 30,
    color: 'brown'
  },
});

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handleSubmit(navigate) {
    this.setState({
      isLoading: true
    });
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found'){
          console.log('Not found');
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          console.log('Success');
          navigate('Dashboard', {userInfo: res});
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      }, (error) => {console.log(error)});
  }

  render() {
    const { navigate } = this.props.navigation;

    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Github User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, navigate)}
          underlayColor="white">
            <Text style={styles.buttonText}> Search </Text>
        </TouchableHighlight>
        {this.state.isLoading}
        <ActivityIndicator animating={this.state.isLoading} size="large" color="white" />
        {showErr}
      </View>
    );
  }
}

export default Main;
