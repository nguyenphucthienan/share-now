import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { urlBase64ToUint8Array } from '../../utils';

class Header extends Component {
  constructor() {
    super();
    this.subscribePushNotification = this.subscribePushNotification.bind(this);
  }

  registerPushNotification() {
    if (('serviceWorker' in navigator)) {
      let reg;
      navigator.serviceWorker.ready
        .then((swreg) => {
          reg = swreg;
          return swreg.pushManager.getSubscription();
        })
        .then((subscription) => {
          if (!subscription) {
            const convertedVapidPublicKey = urlBase64ToUint8Array(config.vapidPublicKey);
            return reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidPublicKey
            });
          }
          return null;
        })
        .then((newSubscription) => {
          if (newSubscription) {
            axios.post('/api/notifications/subscribe', newSubscription)
              .then((response) => {
                if (response.status === 200) {
                  this.displayConfirmNotification();
                }
              });
          }
        })
        .catch(err => console.log(err));
    }
  }

  displayConfirmNotification() {
    if ('serviceWorker' in navigator) {
      const options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: '/resources/icons/144x144.png',
        dir: 'ltr',
        lang: 'en-US',
        vibrate: [100, 50, 200],
        badge: '/resources/icons/144x144.png',
        tag: 'confirm-notification',
        renotify: false,
        actions: [
          { action: 'confirm', title: 'OK' },
          { action: 'cancel', title: 'Cancel' }
        ]
      };

      navigator.serviceWorker.ready
        .then((swreg) => {
          swreg.showNotification('Successfully subscribed!', options);
        });
    }
  }

  subscribePushNotification() {
    Notification.requestPermission((result) => {
      console.log('User choice', result);
      if (result !== 'granted') {
        console.log('No notification permission granted.');
      } else {
        console.log('Notification permission granted');
        this.registerPushNotification();
      }
    });
  }

  renderHeader() {
    if (this.props.user) {
      return [
        <li key="1"><Link to="/dashboard">Dashboard</Link></li>,
        <li key="2"><Link to="/about">About</Link></li>,
        <li key="3"><a href="/api/logout">Logout</a></li>,
        <li key="4"><a className="waves-effect waves-light deep-purple darken-4 btn" onClick={this.subscribePushNotification}>Subscribe</a></li>
      ];
    }

    return [
      <li key="1"><Link to="/dashboard">Dashboard</Link></li>,
      <li key="2"><Link to="/about">About</Link></li>,
      <li key="3"><a href="/api/login/google">Login</a></li>,
      <li key="4"><a className="waves-effect waves-light deep-purple darken-4 btn" onClick={this.subscribePushNotification}>Subscribe</a></li>
    ];
  }

  render() {
    return (
      <header>
        <div className="navbar-fixed">
          <nav className="transparent-fixed">
            <div className="nav-wrapper blue darken-1">
              <Link to="/" className="brand-logo">
                <i className="material-icons">face</i><span className="brand-title">ShareNow</span>
              </Link>
              <a data-activates="nav-mobile" className="button-collapse pointer-cursor">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                {this.renderHeader()}
              </ul>
              <ul className="side-nav" id="nav-mobile">
                {this.renderHeader()}
              </ul>
            </div>
          </nav >
        </div>
      </header>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);
