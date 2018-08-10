import React, { Component } from 'react';
import axios from 'axios';
import './Jira.css';
import { Form } from 'semantic-ui-react';
import Worklog from '../Worklog/Worklog';


class Jira extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      activeTask: false,
      author: '',
      login: false
    }

    this.checkActiveTask = this.checkActiveTask.bind(this);
    this.getWorklogList = this.getWorklogList.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
  }
  
  componentDidMount() {
    this.checkActiveTask();
  }

  componentWillReceiveProps(newProps) {
    this.setState({activeTask: newProps.activeTask})
  }

  checkActiveTask() {
    this.setState({activeTask: this.props.handleActiveTask})
    
  }

  getWorklogList(e) {
    e.preventDefault();
    const key = e.target.key;
    
    axios.post(`/api/jira/${key.value}`, {
      username: sessionStorage.getItem('jiraUserName'),
      password: sessionStorage.getItem('jiraPassword')
    })
      .then(res => {
        this.setState({author: res.data.worklogs[0].author.name})
        const projectArray = res.data.worklogs.map((item, index) => {
          let obj = {}
          obj.author = item.author.name
          obj.comment = item.comment;
          obj.id = item.id;

          return obj;
        })
     
        this.setState({projects: projectArray})
     
    })
    .catch(e => console.log(e));

    key.value = ''
  }

  loginJira(e) {
    const { username, password } = e.target;

    axios.post('/api/jira', {
      username: username.value,
      password: password.value
    })
    .then(res => {
      if (res.status === 200) {
        sessionStorage.setItem('jiraUserName', username.value);
        sessionStorage.setItem('jiraPassword', password.value);
        this.setState({login: true});
      }
    })
    .catch(e => console.log(e)); 
  }

  renderLoginForm() {
    return(
      <div className={ this.state.login ? 'hide' : ''}>
        <h3 style={{textAlign: 'center'}}>Login</h3>
        <Form onSubmit={e => this.loginJira(e)} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column' }} >
          <Form.Group style={{flexDirection: 'column', textAlign: 'center'}}>
            <Form.Input required placeholder="username" name='username' />
            <Form.Input required placeholder="password" name='password' type='password'/>
            <Form.Button content='Submit' style={{marginTop: '20px'}} />
          </Form.Group>
        </Form>
      </div>
    )
  }

  render() {
    return (
      <div className='Jira'>
        <div className='column__header'>
          <h2>Jira</h2>
          
          {this.renderLoginForm()}

          <div className={this.state.login ? '' : 'hide' }>
            <Form onSubmit={this.getWorklogList} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}} >
                <Form.Group>
                  <Form.Input placeholder="user key (almaca-41)" id='key' />
                  <Form.Button content='Submit' />
                </Form.Group>
            </Form>
          </div>
          
        </div>
        
        {this.state.projects.length === 0 ? 
          false 
          :
          <Worklog
            projects={this.state.projects}
            author={this.state.author}
            activeTask={this.state.activeTask}
            bindingItems={this.props.bindingItems}
            showRelatedItems={this.props.showRelatedItems}
          />
        }
      </div>
    )
  }  
}

export default Jira;