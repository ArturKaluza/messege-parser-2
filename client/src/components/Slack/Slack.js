import React, { Component, Fragment } from 'react';
import { List, Segment, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Slack.css'
import Loader from '../Loader/Loader'
import SlackMessage from '../SlackMessage/SlackMessage';
import Reply from '../Reply/Reply';
import * as actions from '../../actions/slack'

class Slack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: '',
      isLoading: false,
      users: []
    }
  }


  getMessages(token, channel) {
    const config = {
      params: {
        token,
        channel
      }
    };
    axios.get('/api/slack/messages', config)
    .then(res => {

      const users = this.state.users
      const messages = res.data.messages;
      const replies = res.data.replies
      users.forEach(user => {
        messages.forEach(message => {
          if (user.id === message.user) {
            message.userName = user.name
          }
        }) 
      })

      users.forEach(user => {
        replies.forEach(reply => {
          if (user.id === reply.user) {
            reply.userName = user.name
          }
        }) 
      })

      this.setState({ messages, replies, isLoading: false })
    })
  }



  getUsers(token) {
    this.setState({ isLoading: true })
    
    const config = {
      params: {
        token
      }
    };

    return axios.get('/api/slack/users', config)
    .then(res => {
      this.setState({ users: res.data })
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { channel } = this.state
    const token = localStorage.getItem('token');
    
    this.props.handleChannelName(channel);

    this.props.getMessages(token, channel)
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    
    if(token) {
      this.props.getChannels(token)
    }
  }

  render() {
    const { handleActiveTask, getMessages, stateMessages } = this.props;
    return (
      <Fragment>
        <div className='column__header'>
          <h2>Slack</h2>
          <a href="https://slack.com/oauth/authorize?client_id=405795262034.405661432179&scope=chat:write:user,channels:history,users:read,users.profile:read,channels:read">
            <Button primary>Add/Change workspace</Button>
          </a>
          {this.props.channels.length !==0 &&
            (<Form onSubmit={this.handleSubmit} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Form.Group>
                <Form.Select placeholder="Select channel" defaultValue={0} options={this.props.channels} name='channel' value={this.state.channel} onChange={this.handleChange}/>
                <Form.Button content='Submit' />
              </Form.Group>
            </Form>)
          }
        </div>
        <Segment color='orange'>
          <Loader isLoading={this.state.isLoading} />
          <List divided relaxed>
            { this.props.messages.map(message => {
              let replies = []
              if(message.replies) {
                replies = this.props.replies.filter(reply => {
                  return message.replies.map(rep => {
                    return reply.ts === rep.ts
                  })
                })
              }
              return (
                <Fragment>
                  <SlackMessage
                    key={message.ts}
                    data={message}
                    activeTask={handleActiveTask}
                    stateMessages={stateMessages}
                    addMessage={getMessages}
                    replies={this.props.replies}
                  />
                  { message.replies && <Reply data={replies}/> }
                </Fragment>
              )
            })}
          </List>
        </Segment>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    channels: state.slack.channels,
    users: state.slack.users,
    messages: state.slack.messages,
    replies: state.slack.replies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannels: token => dispatch(actions.getChannels(token)),
    getUsers: token => dispatch(actions.getUsers(token)),
    getMessages: (token, channel) => dispatch(actions.getMessages(token, channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slack);