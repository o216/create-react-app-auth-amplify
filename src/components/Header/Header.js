import './Header.css';
import { Link } from 'react-router-dom';
import firebase from '../../utilities/firebase';
import { useHistory } from 'react-router-dom';

function Header({isUserSignedIn}) {
  const history = useHistory();
  function handleSignOut(){
    firebase.auth().signOut();
    history.push(`/`);
  }

  return (
    <header className="Header">
      <div><Link to="/">Jubily</Link></div>
      <div className="Header-Right">
        <div><Link to="/search">Search Providers</Link></div>
        <div>|</div>
        {
          isUserSignedIn ?
          <div onClick={handleSignOut}>Sign out</div>
          :
          <>
            <div><Link to="/login">Log In</Link></div>
            <div>|</div>
            <div><Link to="/signup">Sign Up</Link></div>
          </>
        }

      </div>
    </header>
  );
}

export default Header;
