import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from './components/Modal/Index';
import SlideModal from './components/SlideModal/Index';
import {
  authorize
} from './actions/index';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  transitionHtml (){
  {/*<div className="page-transition">
          <ReactCSSTransitionGroup
            component="div"
            // transitionName={ location.action == 'PUSH' ? 'forward' : 'backward' }
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {React.cloneElement(children, {
              key: location.pathname
            })}
            <Modal/>
            <SlideModal/>
          </ReactCSSTransitionGroup>
        </div>*/}
  }

  render() {
    let { children } = this.props;
    return(
      <div className="page-transition">
        {children}
        <Modal/>
        <SlideModal/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authorize: (accessToken) => {
      dispatch(authorize(accessToken));
    }
  };
}


Main.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);