import React from 'react';
import '../containers/GameHome.css';

export default class TopCounter extends React.Component {
  state = {

  };

  render() {
    return (
      <div className="heading">
        <h1 className="title">2048</h1>
        <div className="score_container">
          <div className="scores">0</div>
          <div className="bestScore">0</div>
        </div>
      </div>
    );
  }
}
