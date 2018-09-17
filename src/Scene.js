import {Scene} from 'spritejs';
import React, {Component} from 'react';
import {SpriteRender} from './SpriteRender';

export default class extends Component {
  componentDidMount() {
    // log Konva.Circle instance
    this._scene = new Scene(this.refs.scene, this.props);
    this._mountNode = SpriteRender.createContainer(this._scene);
    SpriteRender.updateContainer(this.props.children, this._mountNode, this);
  }

  componentDidUpdate(prevProps, prevState) {
    SpriteRender.updateContainer(this.props.children, this._mountNode, this);
  }

  componentWillUnmount() {
    SpriteRender.updateContainer(null, this._mountNode, this);
  }

  render() {
    const [width, height] = this.props.viewport || [300, 300];
    const style = {
      position: 'relative',
      width,
      height,
    };
    // return (
    //   <div ref="scene" style={style}></div>
    // );

    return React.createElement('div', {ref: 'scene', style});
  }
}
