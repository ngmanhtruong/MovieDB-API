import React from 'react';
//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Header from './components/Header/header';
import Home from './components/Home';
import Login from './components/Login';
import Movie from './components/Movie';
import Movies from './components/Movies';
import NotFound from './components/NotFound';
import Upcoming from './components/Upcoming';
//Context
import UserProvider from './context';

//styles
import { GlobalStyle } from './GlobalStyle';


const App = () =>(
  <Router>
    <UserProvider>
      <Header />

      <Switch>
        <Route exact path ='/' children={<Home />}>
        </Route>
        <Route path='/upcoming' children={<Upcoming />} />

        <Route path='/login' children={<Login />} />

        <Route path='/movie/:movieId' children={<Movie />}>
        </Route>
        <Route path='/movies' children={<Movies />} />

        <Route path='/*' children={<NotFound />} />
      </Switch>

      <GlobalStyle />
    </UserProvider>
  </Router>
);
export default App;
