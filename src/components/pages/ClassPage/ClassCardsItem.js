import React from 'react';
import { Link } from 'react-router-dom';

function ClassCardItem(props) {
  return (
    <>
      <li className='classcards__item'>
        <Link className='classcards__item__link' to={props.path}>
          <figure className='classcards__item__pic-wrap' data-category={props.label}>
            <img
              className='classcards__item__img'
              alt='Education'
              // src='images/courseimg.jpg'
              src = {props.img}
            />
          </figure>
          <div className='classcards__item__info'>
            <h5 className='classcards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default ClassCardItem;
