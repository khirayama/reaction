/* eslint-env browser */

const Component = require('react').Component;
const PropTypes = require('react').PropTypes;
const createElement = require('react').createElement;

const changeLocation = require('universal/actions/application-action-creators').changeLocation;

class Link extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    event.preventDefault();

    const pathname = this.props.href;

    if (history) {
      history.pushState(null, null, pathname);
    }
    changeLocation(pathname);
  }
  render() {
    return createElement('a', {
      href: this.props.href,
      className: `link ${this.props.className}`,
      onClick: this.handleClick,
    }, this.props.children);
  }
}

Link.defaultProps = {
  className: '',
};

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

module.exports = Link;
