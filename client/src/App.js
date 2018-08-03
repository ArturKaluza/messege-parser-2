import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from 'semantic-ui-react'

import './App.css';
import Main from './containers/Main';
import LoadingPage from './containers/LoadingPage/LoadingPage'
import Nav from './containers/Nav/Nav';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="main-container">
        <Grid>
          <Grid.Column width={2}>
            <Nav/>
          </Grid.Column>
          <Grid.Column width={14}>
          <div>
            <Route exact path="/" component={Main} />
            <Route path="/authorization" component={LoadingPage} />
          </div>
          </Grid.Column>
        </Grid>
      </div>
    </Router>
    );
  }
}

export default App;
