import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Keyboard,
  Platform,
  CheckBox,
  TouchableHighlight,
} from "react-native";

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAll, saveAll } from "./services/storage"

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default class TodoList extends Component {
  state = {
    tarefas: [],
    text: ""
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addTarefa = () => {
    this.setState(
      prevState => {
        let { tarefas, text } = prevState;
        return {
          tarefas: tarefas.concat({ key: tarefas.length, text: text, checked: false }),
          text: ""
        };
      },
      () => saveAll(this.state.tarefas)
    );
  };

  deleteTarefa = i => {
    this.setState(
      prevState => {
        let tarefas = prevState.tarefas.slice();

        tarefas.splice(i, 1);

        return { tarefas: tarefas };
      },
      () => saveAll(this.state.tarefas)
    );
  };

  checkTarefa = i => {
    this.state.tarefas[i].checked = !this.state.tarefas[i].checked;
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    getAll(tarefas => this.setState({ tarefas: tarefas || [] }));
  }

  render() {
    return (
      <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTarefa}
          value={this.state.text}
          placeholder="Nome da Tarefa"
          returnKeyType="done"
          returnKeyLabel="done"/>
        <FlatList
          data={this.state.tarefas}
          style={styles.list}
          data={this.state.tarefas}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <CheckBox
                  value={item.checked} />
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <TouchableHighlight onPress={() => this.deleteTarefa(index)}>
                   <View>
                      <Icon name="trash" style={styles.icon} />
                   </View>
                </TouchableHighlight>
              </View>
              <View style={styles.hr} />
            </View>}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  icon: {
    fontSize: 25
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});