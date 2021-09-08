import React from 'react';
//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Header from './components/Header/header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';


//styles
import { GlobalStyle } from './GlobalStyle';


const App = () =>(
  <Router>
    <Header />

    <Switch>
      <Route exact path ='/' children={<Home />}>
      </Route>

      <Route path='/movie/:movieId' children={<Movie />}>
      </Route>

      <Route path='/*' children={<NotFound />} />
    </Switch>

    <GlobalStyle />
  </Router>
);
export default App;
