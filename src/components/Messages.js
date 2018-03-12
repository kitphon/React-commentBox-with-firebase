import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

var deleteBtnStyle = {
  'float' : 'right'
};
var megListsStyle = {
  fontSize: '13px',
  color: '#2e3440',
  verticalAlign: 'middle',
  height: '40px',
  borderBottom: 'solid 1px',
}

class Messages extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalState: false,
      modalDelState: false,
      messageUpdate: props.message,
    };
  }

  onClickDelete(e){
    e.preventDefault();
    let dbCon = this.props.db.database().ref('/messages');
    dbCon.child(this.props.msgKey).remove();
  }

  updateFunction(e){
    e.preventDefault();
    var obj = {message: this.state.messageUpdate};
    let dbCon = this.props.db.database().ref('/messages');
    dbCon.child(this.props.msgKey).update(obj)
         .then(() => this.toggleModal());
  }

  onChange(e){
    this.setState({
      messageUpdate: e.target.value
    });
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;
      return { modalState: newState };
    });
  }

  toggleModalDel() {
    this.setState((prev, props) => {
      const newState = !prev.modalDelState;
      return { modalDelState: newState };
    });
  }

  render(){
    return(
      <div style={megListsStyle}>
        {this.props.message}
        <a style={deleteBtnStyle}
           className="btn btn-danger pull-right"
           onClick={this.toggleModalDel.bind(this)}>
          x
        </a>
        <a style={deleteBtnStyle}
           className="btn btn-info pull-right"
           onClick={this.toggleModal.bind(this)}>
          Edit
        </a>
        <Modal open={this.state.modalState} onClose={this.toggleModal.bind(this)} little>
          <header>
             <p>Edit Message</p>
           </header>
          <table>
            <tbody>
              <tr>
                <td>
                  <textarea  className="textarea"
                     placeholder="Comment"
                     cols="47"
                     onChange={this.onChange.bind(this)}
                     value={this.state.messageUpdate}>
                  </textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <footer>
            <button className="btn btn-success pull-right" onClick={this.updateFunction.bind(this)}>
              Update
            </button>
            <button className="btn btn-info pull-right" onClick={this.toggleModal.bind(this)}>
              Cancel
            </button>
          </footer>
        </Modal>

        <Modal open={this.state.modalDelState} onClose={this.toggleModalDel.bind(this)} little>
        <header style={{ width: '400px' }}>
           <p>Do you Want to this Message ?</p>
         </header>

          <footer>
            <button className="btn btn-danger pull-right" onClick={this.onClickDelete.bind(this)}>
              Delete
            </button>
            <button className="btn btn-info pull-right" onClick={this.toggleModalDel.bind(this)}>
              Cancel
            </button>
          </footer>
        </Modal>
      </div>
    )
  }
}

export default Messages;
