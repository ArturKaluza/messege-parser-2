import React, { Fragment } from 'react';
import { List, Image, Divider } from 'semantic-ui-react';
import './Commit.css';

const Commit = (props) => {
  return (
    <div className='state'>
      <Fragment >
      <List.Item className={'list-item'}>
        <Image avatar src={props.id === 0 ? '' : props.avatar} size='mini' spaced />
        <List.Content>
          <List.Header as='a'>{props.author.raw || props.author} </List.Header>
        </List.Content>
        <List.Description><b> Message commit: </b>{ props.message }</List.Description>

      </List.Item>
      <Divider />
      </Fragment>
    </div>
  )
}

export default Commit;
