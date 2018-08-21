import React from 'react';
import './main.css';

export default class MainGame extends React.Component {
  addClassName = num => {
    switch (num) {
      case 2: {
        return '';
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
    const {
      touchStart,
      touchEnd
    } = this.props;
    return (
      <div
        className="game_container"
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >
        {
          this.showMatrixMap()
        }
      </div>
    );
  }
}
