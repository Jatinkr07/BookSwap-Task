import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import MyRequests from "./pages/MyRequests";
import AddBook from "./pages/AddBook";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
