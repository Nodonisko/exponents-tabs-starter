import React, { PropTypes } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import Router from '../navigation/Router';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});

const propTypes = {
  notification: PropTypes.object,
  navigator: PropTypes.object,
};

class RootNavigation extends React.Component {
  static renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  componentDidMount() {
    this.notificationSubscription = this.registerForPushNotifications();
  }

  componentWillUnmount() {
    if (this.notificationSubscription) this.notificationSubscription.remove();
  }

  registerForPushNotifications() {
    const { notification } = this.props;

    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // If we started the app from a push notification, handle it right away
    if (notification) this.handleNotification(notification);

    // Handle notifications that come in while the app is open
    return DeviceEventEmitter.addListener('Exponent.notification', this.handleNotification);
  }

  handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${data}`,
      Alerts.notice
    );
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        initialTab="home"
      >
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => RootNavigation.renderIcon('home', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('home')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="links"
          renderIcon={isSelected => RootNavigation.renderIcon('book', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('links')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => RootNavigation.renderIcon('cog', isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute('settings')} />
        </TabNavigationItem>
      </TabNavigation>
    );
  }
}

RootNavigation.propTypes = propTypes;

export default RootNavigation;
