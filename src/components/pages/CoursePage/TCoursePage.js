import React from 'react';
import './CoursePage.css';
import CourseCardItem from './CourseCardItem';
import Axios from 'axios';
import PopButton from '../../PopDialog';

class TCoursePage extends React.Component {
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
      console.log("in teacher page");
    let response;
    try {
      response = await Axios.get('https://mathagoras-backend.herokuapp.com/course/teacher/all', {
        headers: {
          'Authorization': `Basic ` + window.sessionStorage.getItem("token")
        }
      });
    } catch (err) {
      console.log(err);
    }

    if (response) {
      this.setState({ posts: response.data.courses });
      console.log(response);
    }
  }


  render() {
    const posts = this.state.posts.map(post => {
      return <CourseCardItem key={post.course_id} text={post.description} label={post.name} path={'/classcards'} CourseID={post.course_id}/>
    }

    );
    return (
      <div className='cardss'>
        <div className='cardss__container'>
          <div className='cardss__wrapper'>
            <div className='cardss__items'>
              <ul>{posts}</ul>
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
          bname={"Add a course"} 
          title={"Add Course"} 
          msg={"Please Enter the Course ID and Description of your Course"}
          label1={"enter course name"}
          label2={"enter course description"}
          submit={"Add"} 
          cond={true}/>
        </div>
        {/* <button>Delete a course</button> */}
        

      </div>
    );
  }


}

export default TCoursePage;
