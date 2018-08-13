import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { List, Segment, Form } from 'semantic-ui-react';
import Loader from '../Loader/Loader'
import SingleMail from '../SingleMail/SingleMail'
import * as actions from '../../actions/mail'

class Mail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      host: "",
      servers: [
        { key : 'outlook', text: 'outlook', value: 'imap-mail.outlook.com' }, 
        { key: 'gmail', text: 'gmail', value: 'imap.gmail.com' }
      ]
    }
  }
  
  changeValue = (e, { name, value }) =>  this.setState({ [name]: value })

  handleSubmit = (e) => {
    const { email, password, host } = this.state;
    this.props.handleMailName(this.state.email)
    this.props.getMails(email, password, host)
  }

  render() {
    const { mails } = this.props;
    console.log(this.props)
    return (
      <Fragment>
        <div className='column__header'>
          <h2>E-mail</h2>
          <Form onSubmit={this.handleSubmit} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Form.Select required placeholder="Select server" options={this.state.servers} name='host' value={this.state.host} onChange={this.changeValue}/>
            <Form.Group>
              <Form.Input required name="email" label='Email' type='text' onChange={this.changeValue}/>
              <Form.Input required name="password" label='Password' type='password' onChange={this.changeValue}/>
            </Form.Group>
            <Form.Button content='Sign in' />
          </Form>
        </div>
        <Segment color='orange'>
          <Loader isLoading={this.props.isLoading} />
          <List divided relaxed>
          {mails.map(mail => {
            return (
              <SingleMail 
                data={mail}
                key={mail.messageId}
                stateMails={this.props.stateMails}
                addMail={this.props.getMails}
              />
            )
          })}
          </List>
        </Segment>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mails: state.mail.mails,
    isLoading: state.mail.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMails: (email,password, server) => dispatch(actions.getMails(email, password, server))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mail);
