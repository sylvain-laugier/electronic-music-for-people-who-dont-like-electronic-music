import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AdminChecker from './components/admin/AdminChecker.js';
import Main from './components/Main.js';
import ArtistsList from './components/admin/artists/ArtistsList';

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div className="app-container">
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" component={AdminChecker} />
        <Route path="/admin/artists" component={ArtistsList} />
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
