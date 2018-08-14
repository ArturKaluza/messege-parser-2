import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'
import './App.css';
import Main from './containers/Main';
import LoadingPage from './containers/LoadingPage/LoadingPage'
import Nav from './containers/Nav/Nav';
import IssueDetail from './components/IssueDetail/IssueDetail';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main-container">
            <Grid>
              <Grid.Column width={2}>
                <Nav/>
              </Grid.Column>
              <Grid.Column width={14}>
              <div>
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/authorization" component={LoadingPage} />
                  <Route path="/issue/:id" component={IssueDetail} />
                </Switch>
              </div>
              </Grid.Column>
            </Grid>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
