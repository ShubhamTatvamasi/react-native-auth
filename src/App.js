import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD5djuwCSAw3FJzRvAMl0pwDPQsR5wjD98",
      authDomain: "authentication-420e7.firebaseapp.com",
      databaseURL: "https://authentication-420e7.firebaseio.com",
      projectId: "authentication-420e7",
      storageBucket: "authentication-420e7.appspot.com",
      messagingSenderId: "1029347664981"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

renderContent() {
  switch (this.state.loggedIn) {
    case true:
      return (
        <Button onPress={() => firebase.auth().signOut()} >
          Log Out
        </Button>
      )
    case false:
      return <LoginForm />
    default:
      return <Spinner size="large" />
  }
}

  render() {
    return (
      <View>
        <Header headerText='Authentication'/>
        {this.renderContent()}
      </View>
    )
  }
}

export default App;