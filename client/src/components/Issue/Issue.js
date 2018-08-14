import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Issue.css';

const Issue = (props) => {
  return (
    <div className={props.activeTask === props.id ? 'issue active' : 'issue'} onClick={e => props.bindItem(props.id, props.itemKey, e)} >
      <h3 className='issue__title'>{props.itemKey}</h3>
      <div className='issue__body'>
      <p className='issue__id'>id: {props.id}</p>
          <Link to={{
            pathname: `/issue/${props.id}`,
            state: {id: props.id}
            }}>
            <Button 
              className="issue-btn" 
              size='mini'
              circular
              primary
              // onClick={() => props.showRelatedItems(props.id)}
            >Show</Button>
          </Link>
      </div>
    </div>
  )
}

export default Issue;