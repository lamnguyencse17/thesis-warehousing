import React, {Component} from 'react';
import {Register} from '@containers';

export default class RegisterScreen extends Component {
  render() {
    return <Register navigation={this.props.navigation} />;
  }
}
