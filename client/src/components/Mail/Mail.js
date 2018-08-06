import React, { Component, Fragment } from 'react'
import { List, Segment, Form } from 'semantic-ui-react';
import axios from 'axios';
import Loader from '../Loader/Loader'
import SingleMail from '../SingleMail/SingleMail'

export default class Mail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      mails: [],
      email: "",
      password: "",
      servers: [
        { key : 'outlook', text: 'outlook', value: 'imap-mail.outlook.com' }, 
        { key: 'gmail', text: 'gmail', value: 'imap.gmail.com' }
      ]
    }
  }
  
  changeValue = (e, { name, value }) =>  this.setState({ [name]: value })

  handleSubmit = (e) => {
    this.setState({ isLoading: true })
    axios.post('/api/mail', {
      email: this.state.email,
      password: this.state.password,
      host: this.state.server
    })
    .then(response  => {
      this.setState({ mails: response.data, isLoading: false, email: '', server: '', password: '' });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { mails } = this.state;
    return (
      <Fragment>
        <div className='column__header'>
          <h2>E-mail</h2>
          <Form onSubmit={this.handleSubmit} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Form.Select placeholder="Select server" defaultValue={0} options={this.state.servers} name='server' value={this.state.server} onChange={this.changeValue}/>
            <Form.Group>
              <Form.Input name="email" label='Email' type='text' onChange={this.changeValue}/>
              <Form.Input name="password" label='Password' type='password' onChange={this.changeValue}/>
            </Form.Group>
            <Form.Button content='Sign in' />
          </Form>
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
