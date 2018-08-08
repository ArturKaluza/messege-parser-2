import React, { Component } from 'react';
import axios from 'axios';
import './Jira.css';
import { List, Segment, Form } from 'semantic-ui-react';



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
    this.renderWorklog = this.renderWorklog.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
  }
  
  componentDidMount() {
    this.checkActiveTask();
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
   
  renderWorklog() {
    return (
      <Segment color='violet'>
      {this.state.projects.length === 0 ? false : <h3 className='user__title' >User name: {this.state.author}</h3>}
      <List>
        {this.state.projects.map((item, index) => <List.Item
          className={this.state.activeTask === item.id ? 'Jira__item list-item list-item__active' : 'list-item Jira__item'}
          key={index}
          onClick={() => this.props.jiraTask(item.id, item.author, item.comment)}
          > 
        
            <div>
              {item.comment}
            </div>
            <div>
              <p>id: {item.id}</p>
            </div>
        
        </List.Item>
        )}
      </List>
    </Segment>
    )
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
        console.log('login');
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
        
        {this.state.projects.length === 0 ? false : this.renderWorklog()}
      

      </div>
    )
  }  
}

export default Jira;