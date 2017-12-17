import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#878080',
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  }
})

class Separator extends React.Component {
  render() {
    return (
      <View style={styles.separator}>
        <Text>Separator </Text>
      </View>
    )
  }
}

export default Separator;
