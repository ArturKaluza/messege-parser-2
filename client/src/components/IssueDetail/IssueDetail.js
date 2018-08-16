import React, { Component, Fragment } from 'react';
import { Grid, List} from 'semantic-ui-react';
import axios from 'axios';
import { resolve } from 'url';
import './IssueDetail.css';

import CommitDetail from '../Commit/CommitDetail';
import SlackMessagesDetail from '../SlackMessage/SlackMessagesDetail';
import Reply from '../Reply/Reply';

class IssueDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],

      gitCommits: [],

      messages: [],
      replies: [] 
    }

    this.getConnectedItems = this.getConnectedItems.bind(this);
    this.getItemFromGithub = this.getItemFromGithub.bind(this);
  }
  
  componentDidMount() {
    this.getConnectedItems();
    
  }

  getConnectedItems() {
   
    axios.get(`/api/db/${this.props.location.state.id}`)
      .then(res => {
        
        this.setState({data: res.data}, () => {
          this.getItemFromGithub();
          this.getItemFromSlack();
        })        
      })
      .catch(e => console.log(e))
  }

  getItemFromGithub() {
    
    const username = sessionStorage.getItem('username-github');
    const password = sessionStorage.getItem('password-github');
    let repoName = '';
    
    if (this.state.data.length > 0) {
      repoName = this.state.data[0].gitRepoName      
    }
  
    axios.post('/api/github/commit', {
      username: sessionStorage.getItem('username-github'), 
      password: sessionStorage.getItem('password-github'), 
      repoName
    })
      .then(res => {
        const result = [];

        this.state.data.forEach(commit => {
          commit.gitCommits.forEach(item => {
            res.data.forEach(gitCom => {
              if (gitCom.sha === item) {
                result.push(gitCom)
              }
            })
          })
        })
        
        this.setState({gitCommits: result})
      })
      .catch(e => console.log(e))


  } 

  getItemFromSlack() {
    const config = {
      token: localStorage.getItem('token'),
      channel: this.state.data[0].channelID
    }

    axios.post('/api/slack/messages', config)
      .then(res => {
        const messages = [];
        const replies = [];
        // filter messages
        res.data.messages.forEach(message => {
          this.state.data.forEach(dataMes => {
            dataMes.messages.forEach(mes => {
              if (mes === message.ts) {
                messages.push(message)
              }
            })
          })          
        })
        
        // filter repiles
        res.data.replies.forEach(message => {
          this.state.data.forEach(dataMes => {
            dataMes.messages.forEach(mes => {
                if (mes === message.thread_ts) {
                replies.push(message)
              }
            })
          })          
        })

        this.setState({messages, replies})       
    })
    .catch(e => console.log(e))
  }

  getItemFromMail() {

  }

  render() {
   
    return (
      <div>
        
        <h2>Connections Details</h2>
        
        <Grid columns={4} divided>
          <Grid.Row>
            
            <Grid.Column>
              <div>1</div>
            </Grid.Column>
            
            <Grid.Column>
              <div>
                {this.state.gitCommits.map(item => <CommitDetail
                   key={item.sha}
                   avatar={item.avatar}
                   author={item.author}
                   id={item.id}
                   message={item.message}             
                  />
                )}
              </div>
            </Grid.Column>
            
            <Grid.Column>
            <List divided relaxed>
            { this.state.messages.map((message, index) => {
              let replies = []
              if(message.replies) {
                replies = this.state.replies.filter(reply => {
                  return message.replies.map(rep => {
                    return reply.ts === rep.ts
                  })
                })
              }
              return (
                <Fragment>
                  <SlackMessagesDetail
                    key={message.ts}
                    data={message}
                    replies={this.state.replies}
                  />
                  { message.replies && <Reply data={replies} /> }
                </Fragment>
              )
            })}
          </List>
            </Grid.Column>
         
            <Grid.Column>
              <div>4</div>
            </Grid.Column>
         
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default IssueDetail;