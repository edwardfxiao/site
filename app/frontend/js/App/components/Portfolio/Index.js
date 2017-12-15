// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import bowser from 'bowser';
// import _ from 'lodash';

// import Utils from '../../../common/utils';
// import Masonry from 'react-masonry-component';

// import { fetchArticleList } from '../../actions/index';

// class Portfolio extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true
//     };
//   }

//   setIsLoading(bool) {
//     this.setState({ isLoading: bool });
//   }

//   componentWillMount() {
//     this.props.fetchArticleList(1, this.props.portfolioType, 'portfolio');
//     if (!_.isNull(this.props.articleList)) {
//       this.setIsLoading(false);
//     }
//   }

//   componentDidMount() {
//     if (!_.isNull(this.props.articleList)) {
//       this.setIsLoading(false);
//     }
//     if (!(bowser.msie && bowser.version <= 9)) {
//       Utils.initSpin('slide-modal-loader');
//     }
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.portfolioType != this.props.portfolioType) {
//       this.props.fetchArticleList(1, this.props.portfolioType, 'portfolio');
//     }
//     if (_.isNull(prevProps.articleList) && !_.isNull(this.props.articleList)) {
//       this.setIsLoading(false);
//       if (this.props.articleList.length) {
//         this.props.articleList.map((item, key) => {
//           Utils.initSpin(`spin-loader-${key}`);
//         });
//       }
//     }
//   }

//   handleImageLoaded(id) {
//     Utils.stopSpin(id);
//   }

//   // handleLayoutComplete(laidOutItems){
//   //   $('.portfolio-items').addClass('visible');
//   //   $('.load-button-wrapper').addClass('visible');
//   //   Utils.stopSpin('slide-modal-loader');
//   // }

//   handleImagesLoaded() {
//     $('.portfolio-items').addClass('visible');
//     $('.load-button-wrapper').addClass('visible');
//     Utils.stopSpin('slide-modal-loader');
//   }

//   fetch(append) {
//     this.props.fetchArticleList(
//       this.props.articleListCurrentPage + 1,
//       this.props.portfolioType,
//       'portfolio',
//       append
//     );
//   }

//   render() {
//     let {
//       locale,
//       articleList,
//       articleListCurrentPage,
//       articleListTotalPage
//     } = this.props;
//     let { isLoading } = this.state;
//     let LANG_ACTION = require('../../../../../locales/' + locale + '/action');
//     let content;
//     let listHtml;
//     if (!isLoading) {
//       if (articleList.length) {
//         listHtml = articleList.map((item, key) => {
//           let itemHtml = (
//             <div className="portfolio-item" key={key}>
//               <div className="spin-loader" id={`spin-loader-${key}`} />
//               <img
//                 src={`${item.cover}`}
//                 className=""
//                 id={`gallery-image-${key}`}
//                 onLoad={this.handleImageLoaded.bind(
//                   this,
//                   `spin-loader-${key}`,
//                   `gallery-image-${key}`
//                 )}
//               />
//             </div>
//           );
//           let html = (
//             <div
//               className="portfolio-item-wrapper col-lg-3 col-md-4 col-sm-6 col-xs-12"
//               key={key}
//             >
//               {itemHtml}
//             </div>
//           );
//           if (item.title != '' && item.title != ' ') {
//             html = (
//               <div
//                 className="portfolio-item-wrapper col-lg-3 col-md-4 col-sm-6 col-xs-12"
//                 title={item.title}
//                 key={key}
//               >
//                 {itemHtml}
//               </div>
//             );
//           }
//           return html;
//         });
//       }
//       let masonryHtml;
//       if (bowser.msie && bowser.version <= 9) {
//         masonryHtml = listHtml;
//       } else {
//         masonryHtml = (
//           <Masonry
//             className={
//               bowser.msie ? `portfolio-items fade msie` : `portfolio-items fade`
//             } // default ''
//             elementType={'div'} // default 'div'
//             options={{}} // default {}
//             disableImagesLoaded={false} // default false
//             updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
//             // onLayoutComplete={laidOutItems => this.handleLayoutComplete(laidOutItems)}
//             onImagesLoaded={this.handleImagesLoaded.bind(this)}
//           >
//             {listHtml}
//           </Masonry>
//         );
//       }
//       content = (
//         <div
//           className={
//             bowser.msie && bowser.version <= 9
//               ? `row portfolio-items msie`
//               : `row`
//           }
//         >
//           {masonryHtml}
//           <div className="load-button-wrapper al-center fade mgt-10 mgb-20">
//             {articleListCurrentPage != articleListTotalPage
//               ? <div
//                   className="my-button my-button--gray-border"
//                   onClick={this.fetch.bind(this, true)}
//                 >
//                   {LANG_ACTION['load-more']}
//                 </div>
//               : ''}
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div className="slide-modal-content">
//         <div className="spin-loader" id="slide-modal-loader" />
//         {content}
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   let {
//     locale,
//     articleList,
//     articleListCurrentPage,
//     articleListTotalPage,
//     portfolioType
//   } = state;
//   return {
//     locale,
//     articleList,
//     articleListCurrentPage,
//     articleListTotalPage,
//     portfolioType
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchArticleList: (page, category, articleType, append) => {
//       dispatch(fetchArticleList(page, category, articleType, append));
//     }
//   };
// }

// Portfolio.contextTypes = {
//   router: PropTypes.object
// };

// Portfolio.propTypes = {
//   locale: PropTypes.string,
//   portfolioType: PropTypes.string,
//   articleList: PropTypes.array,
//   articleListCurrentPage: PropTypes.number,
//   articleListTotalPage: PropTypes.number,
//   fetchArticleList: PropTypes.func
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
