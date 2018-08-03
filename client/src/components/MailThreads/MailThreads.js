import React from 'react'
import { List } from 'semantic-ui-react';


export default ({ data }) => {
  return (
    <List.Item>
      <List.Icon name='mail' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{ data }</List.Header>
      </List.Content>
    </List.Item>
  )
}
