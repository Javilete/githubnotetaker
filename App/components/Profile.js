import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Badge from './Badge';
import Separator from './Helpers/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: 'brown',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile'
    });

  getRowTitle(user, item) {
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render(){
    const { state }= this.props.navigation;

    var userInfo = state.params.userInfo;
    var selectedUserData = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    var views = selectedUserData.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index} />
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]}</Text>
            </View>
            <Separator />
          </View>
        )
      }
    });
    return(
      <ScrollView style={styles.container}>
        <Badge userInfo={state.params.userInfo} />
        {views}
      </ScrollView>
    )
  }
}

export default Profile;
