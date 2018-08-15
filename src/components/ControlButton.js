import React from 'react';
import { Button, Icon } from 'antd';
import '../containers/GameHome.css';

export default class ControlButton extends React.Component {
  handleLeftButton = () => {
    const { gameActions } = this.props;
    gameActions.fetchCanculNum();
  }
  handleRightButton = () => {
    const { gameActions } = this.props;
    gameActions.fetchRightCanculNum();
  }
  handleTopButton = () => {
    const { gameActions } = this.props;
    gameActions.fetchTopCanculNum();
  }
  handleBottomButton = () => {
    const { gameActions } = this.props;
    gameActions.fetchBottomCanculNum();
  }
  render() {
    return (
      <div className="control_button">
        <Button onClick={this.handleLeftButton} type="primary">
          <Icon type="arrow-left" />
        </Button>
        <Button onClick={this.handleRightButton} type="primary">
          <Icon type="arrow-right" />
        </Button>
        <Button onClick={this.handleTopButton} type="primary">
          <Icon type="arrow-up" />
        </Button>
        <Button onClick={this.handleBottomButton} type="primary">
          <Icon type="arrow-down" />
        </Button>
      </div>
    );
  }
}
