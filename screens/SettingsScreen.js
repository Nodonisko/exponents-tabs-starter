import React, { PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const propTypes = {
  route: PropTypes.object,
};

class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings exp.json',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
      >

        { /* Go ahead and delete ExponentConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */ }
        <ExponentConfigView />

      </ScrollView>
    );
  }
}

SettingsScreen.propTypes = propTypes;

export default SettingsScreen;
