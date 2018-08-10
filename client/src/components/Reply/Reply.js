import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';

export default ({ data }) => {

  return (
    <Fragment>
      { data.map(reply => {
        console.log(reply)
        return (
          <List.Item style={{ paddingLeft: '20px' }}>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>
                {reply.userName}
              </List.Header>
              <List.Description as='a'>
                {reply.text}
              </List.Description>
            </List.Content>
          </List.Item>
        )
      })}
    </Fragment>
  )
}