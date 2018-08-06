import React, { Component, Fragment } from 'react'
import { List, Segment } from 'semantic-ui-react';
import axios from 'axios';
import Loader from '../Loader/Loader'
import SingleMail from '../SingleMail/SingleMail'

export default class Mail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      mails: []
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
      .then(mails => {
        this.setState({ mails, isLoading: false });
      })
  }

  render() {
    const { mails } = this.state;
    return (
      <Fragment>
        <div className='column__header'>
          <h2>E-mail</h2>
        </div>
        <Segment color='orange'>
          <Loader isLoading={this.state.isLoading} />
          <List divided relaxed>
          {mails.map((mail, index) => {
            return (
              <SingleMail 
                data={mail}
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
