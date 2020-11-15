import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 style={{color:"black"}}>Check out our unique Features!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/poll.jpg'
              text='Realtime Polls to increase and record student engagement'
              label='Poll'
              path='/services'
            />
            <CardItem
              src='images/quiz.jpg'
              text="Quizzes to better understand student's grasp on a topic"
              label='Quizzes'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/chats.jpg'
              text='Contextual Messaging tuned to the classroom'
              label='Chatbox'
              path='/services'
            />
            <CardItem
              src='images/analytics.jpg'
              text='Analytics to get a detailed view of students performance'
              label='Analytics'
              path='/log-in'
            />
            <CardItem
              src='images/latex.jpg'
              text='Write mathematical equations without any hassle '
              label='Latex'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
