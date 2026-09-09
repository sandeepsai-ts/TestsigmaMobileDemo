const React = require('react');
const { View } = require('react-native');

function WebView(props) {
  return React.createElement(View, { testID: props.testID });
}

module.exports = { WebView, default: WebView };
