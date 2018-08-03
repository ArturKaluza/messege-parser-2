import React, { Component } from 'react'
import { Loader, List } from 'semantic-ui-react';
import axios from 'axios';
import MailThreads from '../MailThreads/MailThreads'

export default class Mail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      threads: []
    }
  }
  getData() {
    this.setState({ isLoading: true });
    return axios.get('/api/mail')
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getData()
      .then(threads => {
        this.setState({ threads, isLoading: false });
      })
  }

  render() {
    const { threads } = this.state;
    return (
      <div>
        <Loader isLoading={this.state.isLoading} />
        <List divided relaxed>
        {threads.map(thread => {
          return (
            <MailThreads 
              data={thread}
            />
          )
        })}
        </List>
      </div>
    )
  }
}
