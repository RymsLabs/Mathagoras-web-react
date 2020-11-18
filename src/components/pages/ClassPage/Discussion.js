import React from 'react';
import './ClassCards.css';
import ClassCardsItem from './ClassCardsItem';
import Axios from 'axios';
import PopButton from '../../PopDialog';

class Discussion extends React.Component {
  state = {
    discussions: [],
    posts: []
  }
  componentDidMount() {
    this.updatePosts()
  }

  componentDidUpdate() {
    // this.updatePosts()
  }

  

  async updatePosts() {
    let response,response2;
    console.log("in discussion page");
    try {
      response = await Axios.post(`https://mathagoras-backend.herokuapp.com/discussion/${this.props.location.state.CourseID}/`, {
        classDate: `${this.props.location.state.date}`
      }, {
        headers: {
          'Authorization': `Basic ` + window.sessionStorage.getItem("token")
        }
      });
    } catch (err) {
      console.log(err);
    }
    if (response) {
      this.setState({ discussions: response.data.discussions });
      console.log(response);
    }
    try {
      response2 = await Axios.post(`https://mathagoras-backend.herokuapp.com/post/${this.props.location.state.CourseID}/`, {
        classDate: `${this.props.location.state.date}`
      }, {
        headers: {
          'Authorization': `Basic ` + window.sessionStorage.getItem("token")
        }
      });
    } catch (err) {
      console.log(err);
    }
    if (response2) {
      this.setState({ posts: response2.data.posts });
      console.log(response2);
    }

  }

  //test() {
  // <PopButton />
  //}

  render() {
    const discussions = this.state.discussions.map(discussion => {
      return <ClassCardsItem key={discussion.discussion_id} text={discussion.title} discussionId={discussion.discussion_id} label={discussion.discussion_id} path={'/msgs'} img={'images/discuss.png'}/>
    }
    );

    const posts = this.state.posts.map(Post => {
      return <ClassCardsItem key={Post.post_id} text={Post.message} label={Post.title} path={'/msgs'} img={'images/post.png'}/>
    }
    );

    const gg =window.sessionStorage.getItem("isStudent") === 'false' ? 
     <div>
      <PopButton parent={this}
      bname={"Add a Post"} 
      title={"Add Post"} 
      msg={"Add something you wanna post to all"}
      label1={"enter post title"}
      label2={"enter post description"}
      submit={"Add"} 
      cond={true}
      postss={window.sessionStorage.getItem("isStudent")}
      classId={this.props.location.state.CourseID} 
      classDate={this.props.location.state.date}/>
      <br></br>
      <PopButton parent={this}
      bname={"Create a Discussion"} 
      title={"Create a Discussion"} 
      msg={""}
      label={"enter discussion title"}
      submit={"Add"} 
      cond={false}
      postss={window.sessionStorage.getItem("isStudent")}
      classId={this.props.location.state.CourseID} 
      classDate={this.props.location.state.date}/>
      </div>
    
         :
        null
      
    return (
      <div className='cardss'>
        <div className='cardss__container'>
          <div className='cardss__wrapper'>
            <div className='cardss__items'>
              <ul>{discussions}
                  {posts}
              </ul>
            </div>
          </div>
        </div>
        <div style={{
          background: 'black'
          , justifyContent: "center"
          , cursor: "pointer"
          , opacity: 0.65
          ,borderRadius:6
        }}>
            { gg}
          {/* <PopButton parent={this}
          bname={"Add a Post"} 
          title={"Add Post"} 
          msg={"Add something you wanna post to all"}
          label1={"enter post title"}
          label2={"enter post description"}
          submit={"Add"} 
          cond={window.sessionStorage.getItem("isStudent")}
          postss={window.sessionStorage.getItem("isStudent")}
          classId={this.props.location.state.CourseID} 
          classDate={this.props.location.state.date}/> */}
          

        </div>
      </div>
    );
  }


}

export default Discussion;
