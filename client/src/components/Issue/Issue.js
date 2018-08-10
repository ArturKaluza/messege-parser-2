import React from 'react';
import './Issue.css';

const Issue = (props) => {
  return (
    <div className={props.activeTask === props.id ? 'issue active' : 'issue'} onClick={() => props.setIssue(props.id)}>
      <h3 className='issue__title'>{props.itemKey}</h3>
      <p className='issue__id'>id: {props.id}</p>
    </div>
  )
}

export default Issue;