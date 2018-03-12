import React, { Component } from 'react';
import Messages from './Messages';
import _ from 'lodash';


class MessageLists extends Component {
  constructor(props){
    super(props);
    this.state  = {
      messages: []
    }
    let message = this.props.db.database().ref('messages');
    message.on('value', text => {
      this.getData(text.val());
    });
  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                      let cloned = _.clone(messagesVal[messageKey]);
                      cloned.key = messageKey;
                      return cloned;
                    }).value();
    this.setState({
      messages: messages
    });
  }

  render(){
    let messageNodes = this.state.messages.map((message) => {
      return (
        <div>
          <Messages message = {message.message} msgKey = {message.key} db = {this.props.db} />
        </div>
      )
    });
    return (
      <div>
        {messageNodes}
      </div>
    );
  }
}

export default MessageLists;
