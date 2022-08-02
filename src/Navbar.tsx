import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    <Link to="/pastebin">Pastebin</Link>
    <Link to="/streakboard">Streakboard</Link>
  </div>
);

export default Navbar;
