import React, {Component, PropTypes} from 'react';
import DraggableTypes from '../constants/DraggableTypes';
import {DragSource} from 'react-dnd';

// Decorate component with DragSource functionality
// See react-dnd docs: http://gaearon.github.io/react-dnd/docs-overview.html

@DragSource(DraggableTypes.GIF, { // implement DragSource interface
  beginDrag(props, monitor, component) {
    // return data that identifies this draggable
    const item = { id: props.id };
    console.log('Dragging', item);
    return item;
  }
}, function registerWithDnD(connect, monitor) {
  return { // These props are injected into our component
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
})

export default class GifSwatch extends Component {
  static propTypes = {
    thumbStill: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  // DragSource doesn't have a hover spec method
  // let's just create a hover value in state for each swatch
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const { isDragging, connectDragSource, thumbStill, thumb } = this.props;

    const draggingStyles = {
      opacity: .5,
      background: '#6B45C9',
      zIndex: 2
    };

    // moved default styles to App.scss
    const styles = {
      ...(isDragging ? draggingStyles : {})
    }

    // show animated image if hovering
    const imageSrc = (this.state.hover && !isDragging) ? thumb : thumbStill;

    return connectDragSource(
      <div onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} style={styles}>
        <img
          src={ imageSrc }
          className="sidebar--swatch"
          styles={ styles }
        />
      </div>
    );
  }
}
