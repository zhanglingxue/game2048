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
    document.addEventListener('keydown', e => {
      // const { gameActions } = this.props;
      // if (e.keyCode === 37 || e.keyCode === 38
      // || e.keyCode === 39 || e.keyCode === 40) {
      //   console.log(e.keyCode);
      //   gameActions.fetchKeyCodeNum(e.keyCode);
      // }
    });
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
