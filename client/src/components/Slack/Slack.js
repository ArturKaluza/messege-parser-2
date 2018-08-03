import React, { Component, Fragment } from 'react';
import { List, Segment, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import './Slack.css'
import Loader from '../Loader/Loader'
import SlackMessage from '../SlackMessage/SlackMessage'

// import TestComponent from '../TestComponent/TestComponent';

class Slack extends Component {
  constructor() {
    super()

    this.state = {
      messages: [],
      users: [],
      isLoading: false,
      channels: []
    }
  }
  randomNum() {
    return Math.floor(Math.random() * 3) + 1;
  }

  getMessages(token, channel) {
    const config = {
      headers: { 
        'Content-Type':'application/x-www-form-urlencoded',
      },
      params: {
        token,
        channel
      }
    }
    return axios.get('https://slack.com/api/channels.history', config)
    .then(response => {
      const messages = response.data.messages.map(message => {
        message.id = this.randomNum();
        return message;
      })
      this.setState({ messages: messages.reverse(), isLoading: false  })
    })
  }

  getUsers(token) {
    this.setState({ isLoading: true })
    const config = {
      headers: { 
        'Content-Type':'application/x-www-form-urlencoded',
      },
      params: {
        token
      }
    }
    return axios.get('https://slack.com/api/users.list', config)
    .then(response => {
      const newMessages = [...this.state.messages];
      response.data.members.forEach(user => {
        newMessages.forEach(message => {
          if (user.id === message.user) {
            message.name = user.profile.display_name !== "" ? user.profile.display_name : user.profile.real_name;
          }
        })
      })
      this.setState({ message: newMessages })
    })
  }

  getChannels(token) {
    this.setState({ isLoading: true })
    const config = {
      headers: { 
        'Content-Type':'application/x-www-form-urlencoded',
      },
      params: {
        token
      }
    }
    return axios.get('https://slack.com/api/channels.list', config)
    .then(response => {
      const channels = response.data.channels.map(channel => {
        return {
          key: channel.id,
          value: channel.id,
          text: channel.name
        }
      });

      this.setState({ isLoading: false, channels })
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { channel } = this.state
    const token = localStorage.getItem('token');

    return this.getMessages(token, channel)
    .then(this.getUsers(token));
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if(token) {
      this.getChannels(token)
    }
  }

  render() {
    return (
      <Fragment>
        <div className='column__header'>
          <h2>Slack</h2>
          <a href="https://slack.com/oauth/authorize?client_id=405795262034.405661432179&scope=chat:write:user,channels:history,users:read,users.profile:read,channels:read">
            <Button primary>Add/Change workspace</Button>
          </a>
          {this.state.channels.length !==0 &&
            (<Form onSubmit={this.handleSubmit} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Form.Group>
                <Form.Select placeholder="Select channel" defaultValue={0} options={this.state.channels} name='channel' value={this.state.channel} onChange={this.handleChange}/>
                <Form.Button content='Submit' />
              </Form.Group>
            </Form>)
          }
        </div>
        <Segment color='orange'>
          <Loader isLoading={this.state.isLoading} />
          <List divided relaxed>
            { this.state.messages.map(message => {
              return (
              <SlackMessage
                key={message.ts}
                data={message}
                activeTask={this.props.handleActiveTask}
              />
              )
            })}
            {/* <List.Item>
              <TestComponent/>
            </List.Item> */}
          </List>
        </Segment>
      </Fragment>
    )
  }
}


export default Slack;