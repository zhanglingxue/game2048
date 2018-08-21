import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ControlButtonView from '../components/ControlButton';
import * as ActionTypes from '../actions';
import TopCountView from '../components/TopCounter';
import ResartView from '../components/Resart';
import MainGameView from '../components/MainGame';
import './GameHome.css';

class GameHome extends React.Component {
  onTouchStartClick = e => { // 触屏事件开始
    e.preventDefault();
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  onTouchEndClick = e => { // 触屏事件结束
    e.preventDefault();
    this.endX = e.changedTouches[0].clientX;
    this.endY = e.changedTouches[0].clientY;
    const poorX = this.endX - this.startX;
    const poorY = this.endY - this.startY;
    if (Math.abs(poorX) < Math.abs(poorY) && poorY < 0) {
      this.handleTopButton();
    } else if (Math.abs(poorX) < Math.abs(poorY) && poorY > 0) {
      this.handleBottomButton();
    } else if (Math.abs(poorX) > Math.abs(poorY) && poorX < 0) {
      this.handleLeftButton();
    } else if (Math.abs(poorX) > Math.abs(poorY) && poorX > 0) {
      this.handleRightButton();
    }
  }
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
  showGameOver = () => {
    const { entities } = this.props;
    if (entities.Matrix.gameState) {
      return 'game_over_state';
    }
    return 'over_hidden';
  }
  render() {
    document.onkeyup = e => { // 键盘事件
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
    const { gameActions, entities } = this.props;
    if (entities.Matrix.success) {
      alert('game success!!!!');
    }
    return (
      <div className="containerContent">
        <TopCountView state={this.props} />
        <ResartView gameActions={gameActions} />
        <div className="control_view">
          <MainGameView
            state={this.props}
            gameActions={gameActions}
            touchStart={this.onTouchStartClick}
            touchEnd={this.onTouchEndClick}
          />
          <ControlButtonView
            gameActions={gameActions}
            leftButton={this.handleLeftButton}
            rightButton={this.handleRightButton}
            topButton={this.handleTopButton}
            bottomButton={this.handleBottomButton}
          />
        </div>
        <div className={this.showGameOver()}>Game Over</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    entities,
    gameReducer
  } = state;
  return {
    entities,
    gameReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(ActionTypes, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameHome);
