import React from 'react';
import '../containers/GameHome.css';

export default class TopCounter extends React.Component {
  state = {
    isShowAnimation: false
  }
  componentWillReceiveProps(newProps) {
    const { state } = newProps;
    if (state.entities.Matrix.addNum !== 0) {
      this.setState({
        isShowAnimation: true
      });
      setTimeout(() => {
        this.setState({
          isShowAnimation: false
        });
      }, 400);
    }
  }
  addEffect = () => {
    if (this.state.isShowAnimation) {
      return 'score-addition';
    }
    return 'addNumClass';
  }
  render() {
    const { state } = this.props;
    const score = state.entities.Matrix.score;
    const best_score = state.entities.Matrix.best_score;
    const addNum = state.entities.Matrix.addNum;
    return (
      <div className="heading">
        <h1 className="title">2048</h1>
        <div className="score_container">
          <div className="scores">{score}</div>
          <div className="bestScore">{best_score}</div>
          <div className={this.addEffect()}>+{addNum}</div>
        </div>
      </div>
    );
  }
}
