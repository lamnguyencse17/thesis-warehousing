import React, {Component} from 'react';
import {User} from '@containers';

export default class UserScreen extends Component {
  render() {
    return <User navigation={this.props.navigation} />;
  }
}
