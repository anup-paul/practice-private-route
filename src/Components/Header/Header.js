import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div style={{ textAlign: "center" }} >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-1">
                            <Link to="/home" className="nav-link ">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <Link to="/login" className="nav-link btn btn-primary">Login</Link>
                            <Link onClick={() => setLoggedInUser({})} to="/" className="nav-link btn btn-danger">Sign Out</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;