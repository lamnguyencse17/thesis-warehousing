import React, {Component} from 'react';
import {FormInput} from '@containers';

export default class FormInputScreen extends Component {
  render() {
    return <FormInput navigation={this.props.navigation} />;
  }
}
