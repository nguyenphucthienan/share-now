import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './partials/Header';
import Footer from './partials/Footer';
import About from './About';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PostNew from './posts/PostNew';
import PostDetail from './posts/PostDetail';
import NotFound from './NotFound';
import RequireAuth from './auth/requireAuth';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="flex-wrapper">
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/posts/new" component={RequireAuth(PostNew)} />
                <Route exact path="/posts/:id" component={PostDetail} />
                <Route exact path="/404" component={NotFound} />
                <Redirect from="*" to="/404" />
              </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
