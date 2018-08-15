import React from 'react';
import 'antd/dist/antd.css';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
