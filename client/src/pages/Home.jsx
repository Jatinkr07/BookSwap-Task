import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/api";

function Home() {
  const token = localStorage.getItem("token");

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => axios.get(`${API_URL}/api/books`).then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Books</h1>
      {!token && (
        <p className="mb-4 text-red-500">
          Please{" "}
          <a href="/login" className="underline">
            login
          </a>{" "}
          to request books.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {books.length === 0 ? (
          <p>
            No books available.{" "}
            <a href="/add-book" className="underline">
              Add a book
            </a>{" "}
            to start swapping!
          </p>
        ) : (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              isOwner={book.user._id === localStorage.getItem("userId")}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
