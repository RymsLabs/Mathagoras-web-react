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
        if (this.state.msg !== "") {
          this.chatItms.push({
            key: 1,
            type: "",
            message: this.state.message,
            
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();
  }
  fetchMessages = async () => {
    const x = this.props.discussionId;
    const response = await Axios.get(`https://mathagoras-backend.herokuapp.com/messages/${x}`);
    console.log(response.data);
    this.setState({
      chat: response.data.messages
    });
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
              <button className="btn-nobg">
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
                  animationDelay={index + 2}
                  key={itm.message_id}
                  user={itm.user_type === 'teacher' ? "" : null}
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
              <i className="fa fa-plus" style={{alignSelf:"center"}}></i>
            </button>
            <input style={{color:"black",opacity:0.65}}
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.message}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
