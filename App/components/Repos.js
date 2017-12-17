import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import Web_View from './Helpers/Web_View';

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: 'brown',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: 'brown',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

class Repos extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Repositories'
    });

  openRepoPage(url, navigate) {
    console.log('the url is ' + url);
    navigate('Web_View', {url: url});
  }

  render(){
    const { state }= this.props.navigation;
    const { navigate } = this.props.navigation;

    var repos = state.params.repos;
    var views = repos.map((item, index) => {
      var desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openRepoPage.bind(this, repos[index].html_url, navigate)}
              underlayColor='transparent'>
              <Text style={styles.name}>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}> Stars: {repos[index].stargazers_count}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      )
    })

    return(
      <ScrollView style={styles.container}>
        <Badge userInfo={state.params.userInfo} />
        {views}
      </ScrollView>
    )
  }
}

export default Repos;
