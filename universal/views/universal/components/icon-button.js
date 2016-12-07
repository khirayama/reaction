const PropTypes = require('react').PropTypes;
const createElement = require('react').createElement;

function IconButton(props) {
  const props_ = Object.assign({}, props, {
    className: `icon-button ${props.className || ''}`
  });
  return createElement('button', props_, props.children);
}

IconButton.defaultProps = {
  className: '',
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

module.exports = IconButton;
