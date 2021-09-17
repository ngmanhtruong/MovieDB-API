import React from 'react';
//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
//Components
import Header from './components/Header/header';
import Home from './components/Home';
import Login from './components/Login';
import Movie from './components/Movie';
import Movies from './components/Movies';
import NotFound from './components/NotFound';
import TVShows from './components/TVshows';
import Upcoming from './components/Upcoming';
import People from './components/People';
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
        <Route path='/tvshows' children={<TVShows />} />
        <Route path='/people' children={<People />} />

        <Route path='/*' children={<NotFound />} />
      </Switch>
      
      <Footer />
      <GlobalStyle />
    </UserProvider>
  </Router>
);
export default App;
