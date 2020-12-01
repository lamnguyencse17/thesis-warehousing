import React, {Component} from 'react';
import {Home} from '@containers';

export default class HomeScreen extends Component {
  render() {
    return <Home navigation={this.props.navigation} />;
  }
}
