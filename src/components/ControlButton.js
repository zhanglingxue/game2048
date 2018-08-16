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
    document.onkeyup = e => {
      // keyCode(↑：38，←：37，→：39，↓：40)
      switch (e.keyCode) {
        case 37: {
          this.handleLeftButton();
          break;
        }
        case 39: {
          this.handleRightButton();
          break;
        }
        case 38: {
          this.handleTopButton();
          break;
        }
        case 40: {
          this.handleBottomButton();
          break;
        }
        default: {
          break;
        }
      }
    };
    return (
      <div className="control_button">
        <div>
          <Button onClick={this.handleLeftButton} type="primary">
            <Icon type="arrow-left" />
          </Button>
        </div>
        <div>
          <Button onClick={this.handleRightButton} type="primary">
            <Icon type="arrow-right" />
          </Button>
        </div>
        <div>
          <Button onClick={this.handleTopButton} type="primary">
            <Icon type="arrow-up" />
          </Button>
        </div>
        <div>
          <Button onClick={this.handleBottomButton} type="primary">
            <Icon type="arrow-down" />
          </Button>
        </div>
      </div>
    );
  }
}