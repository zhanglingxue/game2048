import React from 'react';
import { connect } from 'react-redux';
// import { fetchLessonInfo } from '../actions';
import ActionSheet from '../components/weui/ActionSheet';

class DemoExample extends React.Component {
  state = {
    isActionSheetActive: false,
    title: '',
    menus: []
  };

  componentDidMount() {
    // this.props.dispatch(fetchLessonInfo(123));
  }

  fetchxxxData() {

  }

  handleShowActionSheet = () => {
    this.setState({
      isActionSheetActive: true,
      title: '这是一个标题',
      menus: [{
        title: '示例菜单1',
        click: () => console.log('示例菜单1')
      }, {
        title: '示例菜单2',
        click: () => console.log('示例菜单2')
      }]
    });
  }

  handleShowActionSheet2 = () => {
    this.setState({
      isActionSheetActive: true,
      title: '这是一个标题2',
      menus: [{
        title: '示例菜单33',
        type: 'danger',
        click: () => console.log('示例菜单33')
      }, {
        title: '示例菜44',
        click: () => console.log('示例菜44')
      }]
    });
  }

  handleHideActionSheet = () => {
    this.setState({
      isActionSheetActive: false
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.handleShowActionSheet}>ios actionsheet</div>

        <div onClick={this.handleShowActionSheet2}>ios actionsheet2</div>

        <ActionSheet
          isActive={this.state.isActionSheetActive}
          title={this.state.title}
          menus={this.state.menus}
          onCancel={this.handleHideActionSheet}
        />
      </div>
    );
  }
}

export default connect()(DemoExample);
