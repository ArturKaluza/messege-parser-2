import React from 'react'
import { List } from 'semantic-ui-react';


export default ({ data, addMail, stateMails }) => {
  return (
    <List.Item onClick={addMail.bind(this, data.messageId)} className={stateMails.filter(item => item === data.messageId).length === 0 ? '' : 'state' }>
      <List.Icon name='mail' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header>From: <a>{ data.from }</a></List.Header>
        <List.Header>Date: <a>{ data.date }</a></List.Header>
        <List.Header>Subject: <a>{ data.thread }</a></List.Header>
      </List.Content>
    </List.Item>
  )
}
