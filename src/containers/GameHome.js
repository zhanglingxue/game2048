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
  state = {
  }
  render() {
    const { gameActions, entities } = this.props;
    if (entities.Matrix.gameState) {
      alert('game over!!!');
    }
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
          />
          <ControlButtonView gameActions={gameActions} />
        </div>
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
