import React, { Component } from 'react';
import {Grid, Divider} from 'semantic-ui-react';
import axios from 'axios';

class IssueDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    this.getConnectedItems = this.getConnectedItems.bind(this);
  }
  
  componentDidMount() {
    this.getConnectedItems();
  }

  getConnectedItems() {
    console.log()

    axios.get(`/api/db/${this.props.location.state.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({data: res.data})
      })
      .catch(e => console.log(e))

  }

  render() {
    return (
      <div>
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