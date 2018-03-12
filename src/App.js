import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MessageLists from './components/MessageLists';
import Messages from './components/Messages';
import MessagesBox from './components/MessagesBox';
import firebase from 'firebase';


var boraderListsStyle = {
  paddingTop : '10px',
  paddingBottom : '10px',
  border : 'solid 1px',
  borderRadius : '3px'
}

var messageBoxStyle = {
  marginTop : '20px',
}

class App extends Component {

  constructor(props){
    super(props);
    var  config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="container">
      <Header title="CommentBox with Firebase" />
      <div className="columns">
        <div className="col-md-4 col-md-offset-4" style={boraderListsStyle}>
          <MessageLists db={firebase} />
        </div>
      </div>
      <div className="columns">
        <div className="col-md-4 col-md-offset-4" style={messageBoxStyle}>
          <MessagesBox db={firebase} />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
