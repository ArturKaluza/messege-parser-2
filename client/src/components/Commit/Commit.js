import React, { Fragment } from 'react';
import { List, Image, Divider } from 'semantic-ui-react';
import './Commit.css';

const Commit = (props) => {
  return (
    <Fragment>
    <List.Item className={props.activeTask === props.taskID ? 'list-item__active' : 'list-item'}>
      <Image avatar src={props.avatar} size='mini' spaced />
      <List.Content>
        <List.Header as='a'>{props.author} </List.Header>
      </List.Content>
      <List.Description><b> Message commit: </b>{ props.message }</List.Description>

    </List.Item>
    <Divider />
    </Fragment>
  )
}

export default Commit;

