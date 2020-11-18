import Axios from "axios";
import React, { Component, createRef} from "react";
import "./chatContent.css";
import ChatItem from "./ChatItem";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [];
  state = {
    chat: []
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  componentDidMount() {
    this.fetchMessages();
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        if (this.state.message !== "") {
          // this.chatItms.push({
          //   key: 1,
          //   type: "",
          //   message: this.state.message,
            
          // });
          // this.setState({ chat: [...this.chatItms] });
          // this.scrollToBottom();
          // this.setState({ msg: "" });
          this.sendmessage();
        }
      }
    });
  }
  sendmessage = async () => {
    const message = this.state.message;
    let url;
    if (window.sessionStorage.getItem("isStudent") === 'true') {
      url = 'https://mathagoras-backend.herokuapp.com/messages/student/';
    } else {
      url = 'https://mathagoras-backend.herokuapp.com/messages/teacher/'
    }
    try {
      await Axios.post(url, {
        discussionId: this.props.discussionId,
        message: message,
      }, {
        headers: {
          'Authorization': `Basic ` + window.sessionStorage.getItem("token")
        }
      });
    } catch (err) {
      console.log(err);
      alert('ERROR!');
    }
    this.setState({
      message: ''
    });
    await this.fetchMessages();
    this.scrollToBottom();
  }
  fetchMessages = async () => {
    const x = this.props.discussionId;
    const response = await Axios.get(`https://mathagoras-backend.herokuapp.com/messages/${x}`);
    console.log(response.data);
    this.setState({
      chat: response.data.messages
    });
    this.scrollToBottom();
  };
  onStateChange = (e) => {
    this.setState({ message: e.target.value });
  };
  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <p style={{color:"black",opacity:0.65,fontSize:40}}>Discussion</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button style={{color:"white"}} className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  date={itm.message_time}
                  animationDelay={index + 2}
                  key={itm.message_id}
                  user={itm.user_type === 'teacher' ? null : 'me'}
                  msg={itm.message}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles" style={{backgroundColor:"black",opacity:0.65}}>
              <i className="fa fa-plus" style={{justifyContent:"center"}}></i>
            </button>
            <input style={{color:"black",opacity:0.65}}
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.message}
            />
            <button className="btnSendMsg" id="sendMsgBtn"
            onClick={() => {
              if(this.state.message !== '') this.sendmessage();
            }}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
