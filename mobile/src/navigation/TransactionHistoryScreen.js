import React, {Component} from 'react';
import {TransactionHistory} from '@containers';

export default class TransactionCreatorScreen extends Component {
  render() {
    return <TransactionHistory navigation={this.props.navigation} />;
  }
}
