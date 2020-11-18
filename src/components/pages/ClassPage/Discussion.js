import React from 'react';
import './ClassCards.css';
import ClassCardsItem from './ClassCardsItem';
import Axios from 'axios';
import PopButton from '../../PopDialog';

class Discussion extends React.Component {
  state = {
    discussions: []
  }
  componentDidMount() {
    this.updatePosts()
  }

  componentDidUpdate() {
    // this.updatePosts()
  }

  async updatePosts() {
    let response;
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
  }

  //test() {
  // <PopButton />
  //}

  render() {
    const discussions = this.state.discussions.map(discussion => {
      return <ClassCardsItem key={discussion.discussion_id} text={discussion.title} discussionId={discussion.discussion_id} label={discussion.discussion_id} path={'/msgs'} img={'images/discuss.png'}/>
    }

    );
    return (
      <div className='cardss'>
        <div className='cardss__container'>
          <div className='cardss__wrapper'>
            <div className='cardss__items'>
              {discussions}
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
          {/* <PopButton parent={this} 
          bname={"Enroll in a Course"} 
          title={"Enroll"} 
          msg={"Please ask for the course id from the course instructor you wish to join."} 
          submit={"Enroll"}
          cond={false}/> */}
        </div>
        {/* <button>Delete a course</button> */}
        

      </div>
    );
  }


}

export default Discussion;
