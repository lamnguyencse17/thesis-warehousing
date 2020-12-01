import React, {Component} from 'react';
import {TransactionCreator} from '@containers';

export default class TransactionCreatorScreen extends Component {
  render() {
    return <TransactionCreator navigation={this.props.navigation} />;
  }
}
