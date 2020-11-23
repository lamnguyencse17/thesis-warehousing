import React, {Component} from 'react';
import {QRcode} from '@containers';

export default class QRcodeScreen extends Component {
  render() {
    return <QRcode navigation={this.props.navigation} />;
  }
}
