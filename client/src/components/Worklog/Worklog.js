import React from 'react'
import { List, Segment, Button } from 'semantic-ui-react';

export default (props) => {
  return (
    <Segment color='violet'>
      {props.projects.length === 0 ? false : <h3 className='user__title' >User name: {props.author}</h3>}
      <List>
        {props.projects.map((item, index) => 
        <List.Item
          className={props.activeTask === item.id ? 'Jira__item list-item list-item__active' : 'list-item Jira__item'}
          key={index}
          onClick={props.showRelatedItems.bind(this, item.id)}
          > 
            <div>
              {item.comment}
            </div>
            <div>
              <p>id: {item.id}</p>
            </div>
            <Button 
              className="worklog-btn" 
              size='mini'
              circular icon='share alternate' 
              primary
              onClick={props.bindingItems.bind(this, item.id, item.author, item.comment)}
            />
        </List.Item>
        )}
      </List>
    </Segment>
  )
}
