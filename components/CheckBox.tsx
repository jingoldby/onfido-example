import React, { Component } from 'react';

export interface CheckBoxProp {
  labelOn: string;
  labelOff: string;
}

class CheckBox extends Component<CheckBoxProp> {
  state = {
    isChecked: false,
  };

  onChange = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}

export default CheckBox;