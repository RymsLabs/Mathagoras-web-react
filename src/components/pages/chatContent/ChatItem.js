import React, { Component } from "react";

export default class ChatItem extends Component {
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? 'me' : "other"}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
             <span>{new Date(this.props.date).toLocaleString()}</span>
            
          </div>
        </div>
      </div>
    );
  }
}
