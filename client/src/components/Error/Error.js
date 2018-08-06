import React from 'react';
import './Error.css';

const err = (props) => (
  <div className='error'>
    <p>{props.text}</p>
  </div>
);

export default err;