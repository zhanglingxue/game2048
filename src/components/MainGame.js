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
    if (num === 2) {
      return 'game_container';
    } else if (num === 4) {
      return 'active';
    } else if (num === 8) {
      return '';
    } else if (num === 16) {
      return '';
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
