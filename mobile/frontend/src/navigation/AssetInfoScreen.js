import React, {Component} from 'react';
import {AssetInfo} from '@containers';

export default class AssetInfoScreen extends Component {
  render() {
    return <AssetInfo navigation={this.props.navigation} />;
  }
}
