import React from 'react';
import '../containers/GameHome.css';

export default class TopCounter extends React.Component {
  state = {
  }
  render() {
    const { state } = this.props;
    const score = state.entities.Matrix.score;
    const best_score = state.entities.Matrix.best_score;
    return (
      <div className="heading">
        <h1 className="title">2048</h1>
        <div className="score_container">
          <div className="scores">{score}</div>
          <div className="bestScore">{best_score}</div>
        </div>
      </div>
    );
  }
}
