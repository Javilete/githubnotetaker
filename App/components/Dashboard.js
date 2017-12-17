import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import api from '../Utils/api';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.userInfo.name}`
    });

  makeBackground(btn) {
    var style = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(btn === 0) {
      style.backgroundColor = '#48BBEC';
    } else if(btn === 1){
      style.backgroundColor = '#E77AAE';
    } else {
      style.backgroundColor = '#758BF4';
    }

    return style;
  }

  goToRepos(navigate, userInfo) {
    console.log('Going to Repos Page of: ' + userInfo.login);
    api.getRepos(userInfo.login)
      .then((res) => {
        if(res.message === 'Not Found'){
          console.log('Not found');
        } else {
          console.log('Repos found');
          navigate('Repos', {userInfo: userInfo, repos: res});
        }
      }, (error) => {console.log(error)});
  }

  goToNotes(navigate, userInfo) {
    console.log('Going to Notes Page of: ' + userInfo.login);
    api.getNotes(userInfo.login)
      .then((res) => {
        res = res || {};
        console.log("Res when retrieving notes: " + Object.values(res));
        navigate('Notes', {userInfo: userInfo, notes: Object.values(res)});
      });
  }

  render() {
    const { state } = this.props.navigation;
    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>
      <Image source={{uri: state.params.userInfo.avatar_url}}
        style={styles.image} />
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={() => navigate('Profile', {userInfo: state.params.userInfo})}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this, navigate, state.params.userInfo)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}> View Repositories </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this, navigate, state.params.userInfo)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Dashboard;
