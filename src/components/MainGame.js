import React from 'react';
import './main.css';

export default class MainGame extends React.Component {
  onTouchStartClick = e => { // 触屏事件开始
    e.preventDefault();
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  };
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
  };
  onMouseDownClick = e => {
    e.preventDefault();
    this.downX = e.clientX;
    this.downY = e.clientY;
  };
  onMouseUpClick = e => {
    e.preventDefault();
    this.upX = e.clientX;
    this.upY = e.clientY;
    const poorX = this.upX - this.downX;
    const poorY = this.upY - this.downY;
    if (Math.abs(poorX) < Math.abs(poorY) && poorY < 0) {
      this.handleTopButton();
    } else if (Math.abs(poorX) < Math.abs(poorY) && poorY > 0) {
      this.handleBottomButton();
    } else if (Math.abs(poorX) > Math.abs(poorY) && poorX < 0) {
      this.handleLeftButton();
    } else if (Math.abs(poorX) > Math.abs(poorY) && poorX > 0) {
      this.handleRightButton();
    }
  };
  addClassName = num => {
    switch (num) {
      case 2: {
        return 'game_container';
      }
      case 4: {
        return 'two_two_color';
      }
      case 8: {
        return 'two_three_color';
      }
      case 16: {
        return 'two_four_color';
      }
      case 32: {
        return 'two_five_color';
      }
      case 64: {
        return 'two_six_color';
      }
      case 128: {
        return 'two_seven_color';
      }
      case 256: {
        return 'two_eight_color';
      }
      case 512: {
        return 'two_nine_color';
      }
      case 1024: {
        return 'two_ten_color';
      }
      case 2048: {
        return 'last_color';
      }
      default: {
        return '';
      }
    }
  };
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
  showMatrixMap = () => {
    const { state } = this.props;
    const matrix = state.entities.Matrix.matrix;
    const row = state.entities.Matrix.newrow;
    const col = state.entities.Matrix.newcol;
    return matrix.map((item, index) => item.map((num, idx) => {
      if (num === 0) {
        return (
          <div />
        );
      } else if (num !== 0) {
        if (row === index && col === idx) {
          if (num === 4) {
            return <div className="active two_two_color">{num}</div>;
          }
          return <div className="active">{num}</div>;
        }
        return <div className={this.addClassName(num)}>{num}</div>;
      }
    }));
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
    return (
      <div
        className="game_container"
        onTouchStart={this.onTouchStartClick}
        onTouchEnd={this.onTouchEndClick}
        onMouseDown={this.onMouseDownClick}
        onMouseUp={this.onMouseUpClick}
      >
        {
          this.showMatrixMap()
        }
      </div>
    );
  }
}
