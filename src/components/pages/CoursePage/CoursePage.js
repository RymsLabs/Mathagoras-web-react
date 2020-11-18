import React from 'react';
import './CoursePage.css';
import CourseCardItem from './CourseCardItem';
import Axios from 'axios';
import PopButton from '../../PopDialog';

class CoursePage extends React.Component {
  state = {
    posts: []
  }
  componentDidMount() {
    this.updatePosts()
  }

  componentDidUpdate() {
    // this.updatePosts()
  }

  async updatePosts() {
    let response;
    console.log("in student course");
    try {
      response = await Axios.get('https://mathagoras-backend.herokuapp.com/courseStudent/', {
        headers: {
          'Authorization': `Basic ` + window.sessionStorage.getItem("token")
        }
      });
    } catch (err) {
      console.log(err);
    }

    if (response) {
      this.setState({ posts: response.data.enrolled });
      console.log(response);
    }
  }

  //test() {
  // <PopButton />
  //}

  render() {
    const posts = this.state.posts.map(post => {
      return <CourseCardItem key={post.course_id} text={post.description} label={post.name} path={'/classcards'} CourseID={post.course_id} />
    }

    );
    return (
      <div className='cardss'>
        <div className='cardss__container'>
          <div className='cardss__wrapper'>
            <div className='cardss__items'>
              {posts}
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
          <PopButton parent={this} 
          bname={"Enroll in a Course"} 
          title={"Enroll"}
          label={"enter course id"} 
          msg={"Please ask for the course id from the course instructor you wish to join."} 
          submit={"Enroll"}
          cond={false}/>
        </div>
        {/* <button>Delete a course</button> */}
        

      </div>
    );
  }


}

export default CoursePage;
