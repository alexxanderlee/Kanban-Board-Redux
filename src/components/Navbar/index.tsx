import './Navbar.css';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand navbar__logo" href="/">Kanban Board</a>
        <div className="collapse navbar-collapse">
          <span className="navbar__span">|</span>
          <span className="navbar__username">{username}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;