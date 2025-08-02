import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold flex items-center">
          <FaBook className="mr-2" /> BookSwap
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            Menu
          </button>
        </div>
        <div
          className={`md:flex ${
            isOpen ? "block" : "hidden"
          } md:items-center md:space-x-4`}
        >
          {token ? (
            <>
              <Link to="/my-books" className="text-white block py-2 md:py-0">
                My Books
              </Link>
              <Link to="/my-requests" className="text-white block py-2 md:py-0">
                My Requests
              </Link>
              <Link to="/add-book" className="text-white block py-2 md:py-0">
                Add Book
              </Link>
              <button
                onClick={handleLogout}
                className="text-white flex items-center py-2 md:py-0"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white block py-2 md:py-0">
                Login
              </Link>
              <Link to="/signup" className="text-white block py-2 md:py-0">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
