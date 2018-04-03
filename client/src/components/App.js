import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="flex-wrapper">
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Landing} />
              </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
