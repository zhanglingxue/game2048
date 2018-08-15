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
  componentDidMount = () => {
    const { gameActions } = this.props;
    gameActions.fetchGetData();
  }
  render() {
    const { gameActions } = this.props;
    // document.addEventListener('keyup', e => {
    //   const { gameActions } = this.props;
    //   if (e.keyCode === 37 || e.keyCode === 38
    //   || e.keyCode === 39 || e.keyCode === 40) {
    //     console.log("2222222")
    //     gameActions.fetchCanculNum(e.keyCode);
    //   }
    // });
    return (
      <div className="containerContent">
        <TopCountView />
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
