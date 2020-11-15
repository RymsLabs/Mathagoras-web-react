import React from 'react';
import { Link } from 'react-router-dom';

function CourseCardItem(props) {
  console.log(props);
  return (
    <>
      <li className='cardss__item'>
        <Link className='cardss__item__link' to={{pathname:props.path,state:{CourseID:props.CourseID}}}>
          <figure className='cardss__item__pic-wrap' data-category={props.label}>
            <img
              className='cardss__item__img'
              alt='Education'
              src='images/courseimg.jpg'
            />
          </figure>
          <div className='cardss__item__info'>
            <h5 className='cardss__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CourseCardItem;
