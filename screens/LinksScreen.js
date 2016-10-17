import React, { PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

const propTypes = {
  route: PropTypes.object,
};

class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Links',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
      >

        { /* Go ahead and delete ExponentLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */ }
        <ExponentLinksView />

      </ScrollView>
    );
  }

}

LinksScreen.propTypes = propTypes;

export default LinksScreen;
