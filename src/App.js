import React from 'react';
//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Header from './components/Header/header';
import Home from './components/Home';
import Login from './components/Login';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
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

        <Route path='/login' children={<Login />} />

        <Route path='/movie/:movieId' children={<Movie />}>
        </Route>

        <Route path='/*' children={<NotFound />} />
      </Switch>

      <GlobalStyle />
    </UserProvider>
  </Router>
);
export default App;
