import React from 'react';
import { Text, View, FlatList, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import api from '../Utils/api';
import Separator from './Helpers/Separator';
import Badge from './Badge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: 'brown',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: 'black',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class Notes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Notes'
    });

  constructor(props){
    super(props);
    console.log(props.navigation.state.params.notes);
    this.state = {
      dataSource: props.navigation.state.params.notes,
      note: '',
      error: ''
    }
  }

  handleChange(event) {
    this.setState({
      note: event.nativeEvent.text
    })
  }

  handleSubmit(username){
    if(this.state.note) {
      var note = this.state.note;
      this.setState({
        note: '',
        error: ''
      })

      api.addNote(username, note)
        .then((data) => {
          api.getNotes(username)
            .then((data) => {
              var updatedNotes = Object.values(data);
              this.setState({
                dataSource: updatedNotes
              })
            })
        }).catch((error) => {
          console.log('Request failed', error);
          this.setState({error});
        });
      }
  }

  render(item) {
    return(
      <View>
        <View style={styles.rowContainer}>
          <Text> {item} </Text>
        </View>
        <Separator />
      </View>
    )
  }

  footer(userInfo) {
    return(
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="New Note" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, userInfo.login)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const { state } = this.props.navigation;

    return(
      <View style={styles.container}>
        <Badge userInfo={state.params.userInfo} />
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => this.render(item)}
          keyExtractor={item => item}/>
        {this.footer(state.params.userInfo)}
      </View>
    )
  }
}

export default Notes;
