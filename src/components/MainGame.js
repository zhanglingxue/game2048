import React from 'react';
import './main.css';

export default class MainGame extends React.Component {
  showMatrixMap = () => {
    const { state } = this.props;
    const matrix = state.entities.Matrix.matrix;
    return matrix.map(item => item.map(num => {
      if (num === 0) {
        return (
          <div />
        );
      } else if (num !== 0) {
        return <div className={this.addClassName(num)}>{num}</div>;
      }
    }));
  }
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
  }
  render() {
    return (
      <div className="game_container" >
        {
          this.showMatrixMap()
        }
      </div>
    );
  }
}
