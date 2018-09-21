import React, {Component} from 'react';

export default class extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://static.codepen.io/assets/embed/ei.js';
    this.refs.codepen.appendChild(script);
  }

  render() {
    return (
      <div className="codepen-container" ref="codepen">{this.props.children}</div>
    );
  }
}
