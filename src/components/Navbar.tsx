import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();

    navigate("/login");
  }

  return (
    <div>
      <h2>🎬 MovieTracker</h2>

      <hr />

      <Link to="/home">Home</Link>

      {" | "}

      <Link to="/search">Search</Link>

      {" | "}

      <Link to="/watched">Watched</Link>

      {" | "}

      <Link to="/reviews">Reviews</Link>

      {" | "}

      <button onClick={handleLogout}>Logout</button>

      <hr />
    </div>
  );
}

export default Navbar;
