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
import People from './components/People';
import TV from './components/TV';
// import Testing from './components/Testing';
//Context
import UserProvider from './context';

//styles
import { GlobalStyle } from './GlobalStyle';
import Person from './components/Person';
import SearchPage from './components/SearchPage';


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
        <Route path='/movies' children={<Movies />} />

        <Route path='/tvshows' children={<TVShows />} />
        <Route path='/tv/:movieId' children={<TV />} />
        
        <Route path='/people' children={<People />} />
        {/* <Route path='/testing' children={<Testing />} /> */}
        <Route path='/person/:id' children={<Person />} />
        <Route path='/searchpage' children={<SearchPage />} />

        <Route path='/*' children={<NotFound />} />
      </Switch>
      
      <Footer />
      <GlobalStyle />
    </UserProvider>
  </Router>
);
export default App;
