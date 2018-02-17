import React, { Component } from 'react';
import { connect } from 'react-redux';
import StageButton from './stage_button';
import { showDevSidebar, hideDevSidebar } from '../actions/ui_actions';

const mapStateToProps = state => {
  return {
    sidebarShown: state.ui.showDevSidebar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showDevSidebar: () => dispatch(showDevSidebar()),
    hideDevSidebar: () => dispatch(hideDevSidebar())
  };
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.stages = [1,2,3,4];

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    console.log('toggling');
    if (this.props.sidebarShown) {
      this.props.hideDevSidebar();
    } else {
      this.props.showDevSidebar();
    }
  }

  render() {
    const contentClasses = ["dev-sidebar-content animated"];
    if (this.props.sidebarShown !== true) {
      contentClasses.push("hide-sidebar");
      contentClasses.push("fadeOutLeft");
    }

    const sidebarClasses = ["dev-sidebar animated fadeInLeft"];

    const stages = this.stages.map((stage)=>{
      return <StageButton
        key={stage}
        stage={stage}/>;
    });

    return (
      <div className={sidebarClasses.join(" ")}>
        <div className={contentClasses.join(" ")}>
          <h1>Stages</h1>
          {stages}
        </div>
        <div
          className='dev-sidebar-handle'
          onClick={this.toggleSidebar}>
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
