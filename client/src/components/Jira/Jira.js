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
      author: ''
    }

    this.checkActiveTask = this.checkActiveTask.bind(this);
    this.getWorklogList = this.getWorklogList.bind(this);
  }
  
  componentDidMount() {
    this.checkActiveTask();
  }

  componentWillReceiveProps(newProps) {
    this.setState({activeTask: newProps.handleActiveTask})
  }

  checkActiveTask() {
    this.setState({activeTask: this.props.handleActiveTask})
    
  }

  getWorklogList(e) {
    e.preventDefault();
    const key = e.target.key;
    
    axios.get(`/api/jira/${key.value}`)
      .then(res => {
      this.setState({author: res.data.worklogs[0].author.name})
      const projectArray = res.data.worklogs.map((item, index) => {
        let obj = {}
        
        obj.comment = item.comment;
        obj.id = item.id;

        return obj;
      })
     
      this.setState({projects: projectArray})
     
    })
    .catch(e => console.log(e));

    key.value = ''
  }
   

  render() {
    return (
      <div className='Jira'>
        <div className='column__header'>
          <h2>Jira</h2>
          
          <Form onSubmit={this.getWorklogList} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
              <Form.Group>
                <Form.Input placeholder="user key (almaca-41)" id='key' />
                <Form.Button content='Submit' />
              </Form.Group>
          </Form>
          
        </div>
        <Segment color='violet'>
          <h3 className='user__title' >User name: {this.state.author}</h3>
          <List>
            {this.state.projects.map((item, index) => <List.Item
              className={this.state.activeTask === (index + 1) ? 'Jira__item list-item list-item__active' : 'list-item Jira__item'}
              key={index}
              onClick={() => this.props.jiraTask(index + 1)}
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

      </div>
    )
  }  
}

export default Jira;