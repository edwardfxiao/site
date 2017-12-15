import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'spin.js';

const ID = 'spin-loader';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let lines = 13,
      length = 18,
      width = 8,
      radius = 33,
      scale = .6,
      corners = 1,
      color = '#000',
      opacity = 0.25,
      rotate = 0,
      direction = 1,
      speed = 1,
      trail = 60,
      fps = 20,
      zIndex = 2e9,
      className = 'spinner',
      top = '50%',
      left = '50%',
      shadow = false,
      hwaccel = false,
      position = 'absolute';

    const { options } = this.props;
    if (options) {
      lines = options.lines ? options.lines : lines;
      length = options.length ? options.length : length;
      width = options.width ? options.width : width;
      radius = options.radius ? options.radius : radius;
      scale = options.scale ? options.scale : scale;
      corners = options.corners ? options.corners : corners;
      color = options.color ? options.color : color;
      opacity = options.opacity ? options.opacity : opacity;
      rotate = options.rotate ? options.rotate : rotate;
      direction = options.direction ? options.direction : direction;
      speed = options.speed ? options.speed : speed;
      trail = options.trail ? options.trail : trail;
      fps = options.fps ? options.fps : fps;
      zIndex = options.zIndex ? options.zIndex : zIndex;
      className = options.className ? options.className : className;
      top = options.top ? options.top : top;
      left = options.left ? options.left : left;
      shadow = options.shadow ? options.shadow : shadow;
      hwaccel = options.hwaccel ? options.hwaccel : hwaccel;
      position = options.position ? options.position : position;
    }
    const opts = {
      lines,
      length,
      width,
      radius,
      scale,
      corners,
      color,
      opacity,
      rotate,
      direction,
      speed,
      trail,
      fps,
      zIndex,
      className,
      top,
      left,
      shadow,
      hwaccel,
      position
    };
    const target = document.getElementById(ID);
    new Spinner(opts).spin(target);
  }

  render() {
    return <div id={ID} />;
  }
}
Index.propTypes = {
  options: PropTypes.object
};
export default Index;
