import React, { Component, Fragment } from 'react'
import { List, Segment } from 'semantic-ui-react';
import axios from 'axios';
import Loader from '../Loader/Loader'
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
      <Fragment>
        <div className='column__header'>
          <h2>E-mail</h2>
        </div>
        <Segment color='orange'>
          <Loader isLoading={this.state.isLoading} />
          <List divided relaxed>
          {threads.map((thread, index) => {
            return (
              <MailThreads 
                data={thread}
                key={index}
              />
            )
          })}
          </List>
        </Segment>
      </Fragment>
    )
  }
}
