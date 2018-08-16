import React from 'react';
import '../containers/GameHome.css';

export default class Resart extends React.Component {
  
  handleResart = () => {
    const { gameActions } = this.props;
    gameActions.fetchResart();
  }
  render() {
    return (
      <div className="game_infor">
        <span className="game_intro">
          <div>Keypressing '← ↑ → ↓' on PC.</div>
          <div>Touch moving on Phone! Join it & have fun!</div>
        </span>
        <span className="resart_button" onClick={this.handleResart}>
          Resart
        </span>
      </div>
    );
  }
}
