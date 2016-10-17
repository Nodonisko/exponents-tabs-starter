import React, { PropTypes } from 'react';
import {
  Text,
} from 'react-native';
import {
  Font,
} from 'exponent';

const propTypes = {
  style: PropTypes.number,
};

const MonoText = props => (<Text {...props} style={[props.style, Font.style('space-mono')]} />);

MonoText.propTypes = propTypes;

export default MonoText;
