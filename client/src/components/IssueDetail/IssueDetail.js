import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import { resolve } from 'url';

class IssueDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    this.getConnectedItems = this.getConnectedItems.bind(this);
    this.getItemFromGithub = this.getItemFromGithub.bind(this);
  }
  
  componentDidMount() {
    this.getConnectedItems();
  }

  getConnectedItems() {
    console.log()

    axios.get(`/api/db/${this.props.location.state.id}`)
      .then(res => {
        this.setState({data: res.data}, () => {
          this.getItemFromGithub()
        })        
      })
      .catch(e => console.log(e))
  }

  getItemFromGithub() {
    
    const username = sessionStorage.getItem('username-github');
    const password = sessionStorage.getItem('password-github');
    let repoName = '';
    
    if (this.state.data.length > 0) {
      console.log('work')
      repoName = this.state.data[0].gitRepoName      
    }

   console.log('github');
    // const repoName = 

   
   // axios.post('/api/github/commit', {username, password, repoName})


  } 

  getItemFromSlack() {

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
              <div>2</div>
            </Grid.Column>
            
            <Grid.Column>
              <div>3</div>
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