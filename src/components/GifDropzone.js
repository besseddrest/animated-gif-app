import React, {Component, PropTypes} from 'react';
import DraggableTypes from '../constants/DraggableTypes';
import {DropTarget} from 'react-dnd';

import '../styles/GifDropzone.scss';

// Decorate component with DropTarget functionality
// See react-dnd docs: http://gaearon.github.io/react-dnd/docs-overview.html
@DropTarget(DraggableTypes.GIF, { // implement DropTarget interface
  drop(props, monitor, component) {
    const item = monitor.getItem();

    // update this dropzone with image with matching ID
    props.onUpdate(props.id, item.id);

    console.log('Dropped', item);
  }
}, function registerWithDnD(connect, monitor) {
  return { // These props are injected into our component
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
})

export default class GifDropzone extends Component {
  static propTypes = {
    src: PropTypes.string,
    // Injected by React DnD:
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const { connectDropTarget, isOver, canDrop, gif } = this.props;
    // adjust dimensions based on orientation of image
    const styles = (gif.width > gif.height) ? { width: '100%' } : { height: '100%'};
    const orientation = (gif.width > gif.height) ? 'dropzone--gif__landscape' : 'dropzone--gif__portrait';
    return connectDropTarget(
      <div className="dropzone col-xs-6 clearfix" style={{ position: 'relative' }} >
        { gif.downsized ? <span className={'dropzone--gif ' + orientation}><img src={gif.downsized} style={styles}/></span> : <span className="dropzone--placeholder">Drop your image here</span> }
      </div>
    );
  }
}
