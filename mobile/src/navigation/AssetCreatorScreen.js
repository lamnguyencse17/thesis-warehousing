import React, {Component} from 'react';
import {AssetCreator} from '@containers';

export default class AssetCreatorScreen extends Component {
  render() {
    return <AssetCreator navigation={this.props.navigation} />;
  }
}
