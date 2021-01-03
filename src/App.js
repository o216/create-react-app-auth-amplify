//import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { useState } from 'react';
import firebase from './utilities/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App(){
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [currentUser, setCurrentUser]  = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
      setIsUserSignedIn(true)
    } else {
      setIsUserSignedIn(false)
    }
  });


  return (
    <Router>
      <div className="App">
        <Header isUserSignedIn={isUserSignedIn}/>
        <Switch>
          <Route exact path="/" component={(props) => <Home {...props} key={window.location.pathname}/>}/>
          <Route exact path="/login" component={(props) => <Login {...props} hasSignedUp={true} isUserSignedIn={isUserSignedIn} key={window.location.pathname}/>}/>
          <Route exact path="/signup" component={(props) => <Login {...props} hasSignedUp={false} isUserSignedIn={isUserSignedIn} key={window.location.pathname}/>}/>
          <Route path="/profile/:paramId?">
            {currentUser && <Profile user={currentUser}/>}
          </Route>
          <Route exact path="/search">
            <div>Page where user can search providers...</div>
          </Route>
          </Switch>
      </div>
    </Router>
  );

}

export default App;
