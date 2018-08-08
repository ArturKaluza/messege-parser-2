import React from 'react'
import { List } from 'semantic-ui-react';

export default ({ data , addMessage, stateMessages }) => {
  console.log(data.ts)
  return (
    <List.Item onClick={addMessage.bind(this, data.ts)} className={stateMessages.filter(item => item === data.ts).length === 0 ? '' : 'state' }>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{ data.name || ''}</List.Header>
        <List.Description as='a'>{ data.text }</List.Description>
      </List.Content>
    </List.Item>
  )
}