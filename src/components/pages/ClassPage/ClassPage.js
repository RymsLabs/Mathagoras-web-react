import React from 'react';
import {Component} from 'react';
import './ClassCards.css';
import ClassCardsItem from './ClassCardsItem';
import Axios from 'axios';

class ClassPage extends Component {
    // constructor(props){
    //     super(props);
    
    // }

    state = {
        posts: [],
        
    }
    
    componentDidMount(props) {
        this.updatePosts()
    }

    componentDidUpdate() {
        // this.updatePosts()
    }

    async updatePosts() {
        let response;
        try {
            console.log("hi",this.props.location.state.CourseID);
            
            response = await Axios.get(`https://mathagoras-backend.herokuapp.com/class/${this.props.location.state.CourseID}`, {
                headers: {
                    'Authorization': `Basic ` + window.sessionStorage.getItem("token")
                }
            });
            console.log(response)
        } catch (err) {
            //console.log(props.CourseID);
            console.log(err);
        }

        if (response) {
            this.setState({ posts: response.data.classes });
        }
      
    }


    render() {
        const post = this.state.posts[0];
        var components = [];
        if (post) {
            console.log(post);
            
            
            
            const fromDate = new Date(post['from']).getTime();
            const tillDate = new Date(post.till).getTime();
            const Days = Math.floor((tillDate - fromDate) / (1000 * 60 * 60 * 24));
            console.log(Days);
            for (let i = 0; i < Days; i++) {
                
                let classdate = new Date(post['from'])
                classdate.setDate(classdate.getDate()+i)
                let date = classdate.toISOString().split('T')[0] + ' ' + post.start_time;
                const temp=classdate.toDateString()
                console.log(`COURSEID: ${post.course_id}`);
                components.push(<ClassCardsItem key={post.class_id} text={`${post.start_time} - ${post.end_time}`} label={temp} path={'/discussion'} date={date} CourseID={this.props.location.state.CourseID} img={'images/teacherclass.jpg'}/>)
            }
        }
        else {
            components.push(
                <div>
                    <h1 style={{color:"black",opacity:0.65,fontSize:60}}>There are No Classes Set</h1>
                </div>
            )
        }
           
            return (
              
                <div>
                      {/* {console.log(components.length)} */}
                   <h1 style={{color:"black",opacity:0.65,fontSize:60}}>Classes</h1>
                <div className='classcards'>
                    <div className='classcards__container'>
                        <div className='classcards__wrapper'>
                            <div className='classcards__items'>
                                <ul>{components}
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            );
        
    }


}

export default ClassPage;
