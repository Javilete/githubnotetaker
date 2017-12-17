import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'brown',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      userInfo: this.props.userInfo,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.userInfo.avatar_url}} />
        <Text style={styles.name}> {this.state.userInfo.name} </Text>
        <Text style={styles.handle}> {this.state.userInfo.login} </Text>
      </View>
    )
  }
}

//Will verify properties are there when this component is invoked, otherwise it will throw an error in console
Badge.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default Badge;
