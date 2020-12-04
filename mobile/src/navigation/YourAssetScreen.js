import React, {Component} from 'react';
import {YourAsset} from '@containers';

export default class YourAssetScreen extends Component {
  render() {
    return <YourAsset navigation={this.props.navigation} />;
  }
}
