import React from 'react';
import './Navbar.css';
import { useAppDispatch } from '../../redux/store';
import { userActions } from '../../redux/features/user';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const dispatch = useAppDispatch();

  function logOut() {
    dispatch(userActions.logOut());
    console.log('logout')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand navbar__logo" href="/">Kanban Board</a>
        <div className="navbar__user">
          <span className="navbar__username">{username}</span>
          <button
            type="button"
            className="navbar__btn"
            onClick={logOut}
          >Log Out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;