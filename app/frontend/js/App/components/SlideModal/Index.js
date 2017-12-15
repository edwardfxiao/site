// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import { SLIDE_MODAL_CONTENT_COMPONENT_OBJECT } from '../../reducers/ConstValue';

// import { setArticleList, setSlideModalContentName } from '../../actions/index';

// class SlideModal extends Component {
//   constructor(props) {
//     super(props);
//   }

//   closeSlideModal() {
//     this.props.setArticleList(null);
//     $('.slide-modal').removeClass('visible');
//     $('.portfolio-items').removeClass('visible');
//     this.props.setSlideModalContentName('Empty');
//     $.fn.fullpage.setAllowScrolling(true);
//   }

//   render() {
//     let { slideModalContentName, className } = this.props;
//     let Component = SLIDE_MODAL_CONTENT_COMPONENT_OBJECT[slideModalContentName];
//     if (!className) {
//       className = '';
//     }
//     return (
//       <div
//         className={`slide-modal ${className}`}
//         id="mySlideModal"
//         tabIndex="-1"
//         role="dialog"
//         aria-hidden="true"
//       >
//         <div className="close-wrapper">
//           <div className="close" onClick={this.closeSlideModal.bind(this)}>
//             <span className="icon icon-highlight-off" />
//           </div>
//         </div>
//         <Component />
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   let { slideModalContentName } = state;
//   return {
//     slideModalContentName
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     setArticleList: list => {
//       dispatch(setArticleList(list));
//     },
//     setSlideModalContentName: val => {
//       dispatch(setSlideModalContentName(val));
//     }
//   };
// }

// SlideModal.contextTypes = {
//   router: PropTypes.object
// };

// SlideModal.propTypes = {
//   className: PropTypes.string,
//   setArticleList: PropTypes.func,
//   setSlideModalContentName: PropTypes.func,
//   slideModalContentName: PropTypes.string
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SlideModal);
