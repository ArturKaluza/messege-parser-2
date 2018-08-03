import React, { Component } from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import axios from 'axios';
import asyncLocalStorage from '../../utils/asyncLocalStorage'

export default class LoadingPage extends Component {


  componentDidMount() {
    const searchParam = this.props.location.search.split('=')[1];
    const code = searchParam.split('&')[0];
    this.getToken(code);
  }

  getToken(code) {
    const config = {
      headers: { 
        'Content-Type':'application/x-www-form-urlencoded',
      },
      params: {
        code: code,
        client_id: '405795262034.405661432179',
        client_secret: '7f84f788d69394d1a9cbec472d1a1065'
      }
    }
    return axios.get('https://slack.com/api/oauth.access?', config)
    .then(response => {
      console.log(response)
      if(response.data.ok) {
        asyncLocalStorage.setItem('token', response.data.access_token)
        .then(() => this.props.history.push("/"))
      } else {
        this.props.history.push("/")
      }
    })
  }
  render() {

    return (
      <Segment>
        <Dimmer active inverted>
          <Loader size='massive'></Loader>
        </Dimmer>
      </Segment>
    )
  }
}
