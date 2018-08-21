import React from 'react';
import { Button, Icon } from 'antd';
import '../containers/GameHome.css';

export default class ControlButton extends React.Component {
  state = {
  }
  render() {
    const {
      leftButton,
      rightButton,
      topButton,
      bottomButton
    } = this.props;
    return (
      <div className="control_button">
        <div>
          <Button onClick={leftButton} type="primary">
            <Icon type="arrow-left" />
          </Button>
        </div>
        <div>
          <Button onClick={rightButton} type="primary">
            <Icon type="arrow-right" />
          </Button>
        </div>
        <div>
          <Button onClick={topButton} type="primary">
            <Icon type="arrow-up" />
          </Button>
        </div>
        <div>
          <Button onClick={bottomButton} type="primary">
            <Icon type="arrow-down" />
          </Button>
        </div>
      </div>
    );
  }
}
