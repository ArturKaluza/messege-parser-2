import React, { Component } from 'react';
import axios from 'axios';
import './Jira.css';
import { List, Segment } from 'semantic-ui-react';


class Jira extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      activeTask: false
    }

    this.checkActiveTask = this.checkActiveTask.bind(this);
    this.getProjectList = this.getProjectList.bind(this);
  }
  
  componentDidMount() {
    this.checkActiveTask();
    this.getProjectList();

  }

  componentWillReceiveProps(newProps) {
    this.setState({activeTask: newProps.handleActiveTask})
  }

  checkActiveTask() {
    this.setState({activeTask: this.props.handleActiveTask})
    
  }

  // 
  getProjectList() {
    axios.get('/api/jira')
      .then(res => {
      const projectArray = []

      projectArray.push(res.data[2], res.data[8], res.data[9]);
      this.setState({projects: projectArray})
     
    })
    .catch(e => console.log(e));
  }
   

  render() {
    return (
      <div className='Jira'>
        <div className='column__header'>
          <h2>Jira</h2>
          
        </div>
        <Segment color='violet'>
          <List>
            {this.state.projects.map((item, index) => <List.Item
              className={this.state.activeTask === (index + 1) ? 'Jira__item list-item list-item__active' : 'list-item Jira__item'}
              key={index}
              onClick={() => this.props.jiraTask(index + 1)}
              > 
              {item.name}

            </List.Item>
            )}
          </List>
        </Segment>

      </div>
    )
  }  
}

export default Jira;