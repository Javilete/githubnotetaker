import React from 'react';
import { View, StyleSheet, Text, WebView } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    flexDirection: 'column'
  }
})

class Web_View extends React.Component {

  render() {
    const { state }= this.props.navigation;

    return(
      <View style={styles.container}>
        <WebView source={{uri: state.params.url}} />
      </View>
    )
  }
}

export default Web_View;
