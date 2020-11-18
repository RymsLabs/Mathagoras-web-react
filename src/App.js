import React from 'react';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';
import Navbar2 from './components/Navbar2';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Quiz from './components/pages/QuizPage/Quiz';
import CoursePage from './components/pages/CoursePage/CoursePage';
import TCoursePage from './components/pages/CoursePage/TCoursePage';
import ClassPage from './components/pages/ClassPage/ClassPage';
import chat from './components/pages/chatBody/ChatBody';
import Discussion from './components/pages/ClassPage/Discussion';

function App() {

  const PublicRoute = ({ component: Component , ...rest})=>{
    return (
        <Route {...rest}  component={(props)=>(
            <div>
                <Navbar /> {/* HEADER ALWAYS VISIBLE */}
                <Component {...props} />
            </div>
        )}
        />
    )
}
const AdminRoute = ({ component: Component , ...rest})=>{
  return (
      <Route {...rest}  component={(props)=>(
          <div>
              <Navbar1 /> {/* HEADER ALWAYS VISIBLE */}
              <Component {...props} />
          </div>
      )}
      />
  )
}
const LoggedInRoute = ({ component: Component , ...rest})=>{
  return (
      <Route {...rest}  component={(props)=>(
          <div>
              <Navbar2 /> {/* HEADER ALWAYS VISIBLE */}
              <Component {...props} />
          </div>
      )}
      />
  )
}

  return (

    <>
      <Router>
         {/* <Navbar /> */}
        <Switch>
          <PublicRoute path='/' exact component={Home} />
          <LoggedInRoute path='/studentcards' exact component={CoursePage} />
          <LoggedInRoute path='/TeacherCourse' exact component={TCoursePage} />
          <LoggedInRoute path='/classcards' exact component={ClassPage} />
          <PublicRoute path='/services' component={Services} />
          <LoggedInRoute path='/quizapp' component={Quiz} />
          <LoggedInRoute path='/msgs' component={chat} />
          <LoggedInRoute path='/discussion' component={Discussion} />
          <AdminRoute path='/Log' component={LogIn} />
          <PublicRoute path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
