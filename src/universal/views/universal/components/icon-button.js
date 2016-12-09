const {createElement, PropTypes} = require('react');
const classNames = require('classnames');
const jsx = require('universal/libs/jsx-template');

function IconButton(props) {
  return eval(jsx`
    <button {...props} className={classNames("icon-button", props.className)}>{props.children}</button>
  `);
}

IconButton.defaultProps = {
  className: '',
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

module.exports = IconButton;
